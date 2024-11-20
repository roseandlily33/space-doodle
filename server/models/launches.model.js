const Launch = require('./launches.mongo');
//const planets = require('./planets.model');
const axios = require('axios');

const DEFAULT_FLIGHT_NUM = 100;
const URL = 'https://api.spacexdata.com/v4/launches/query'
const launch = {
    flightNumber: 100, 
    mission: 'Kepler Exporation X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'MIP'],
    upcoming: true,
    success: true
};
saveLaunch(launch);

async function populateLaunches(){
    let response = await axios.post(URL,{
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                }, {
                    path: 'payloads',
                    select: {
                        'customers' : 1
                    }
                }
            ]
        }
    });
    if(response.status !== 200){
        console.log('There was a problem downloading launch data');
        throw new Error ('There was an error')
    }
    const launchData = response.data.docs;
    for(const launchDoc of launchData){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers']
        })
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers
        }
        console.log('AXIOS', launch.flightNumber, launch.rocket, launch.mission);
        await saveLaunch(launch)
    }
   
}

async function loadLaunchData(){
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });
    if(firstLaunch){
        console.log('Launch Data was already loaded');
        return;
    }
    await populateLaunches()

}
async function findLaunch(filter){
    return await Launch.findOne(filter)
}

async function existsLaunchWithId(launchId){
    return await findLaunch({flightNumber: launchId})
  }
async function getLatestFlightNumber(){
    const latestLaunch = await  Launch.findOne()
    .sort('-flightNumber');
    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUM;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches(skip, limit){
    return await Launch.find({}, {
        '_id': 0, '__v': 0
    }).sort({flightNumber : 1}).skip(skip).limit(limit);
}

async function getUpcomingLaunches(){
    return await Launch.find({
        upcoming: true
    }, {
        '_id': 0, '__v': 0
    }).sort({flightNumber : 1});
}

async function saveLaunch(launch){
   try{
    let saved = await Launch.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {upsert: true, new: true});
    return saved;
   } catch(err){
    throw new Error('Launch data was not saved');
   }
}

async function scheduleNewLaunch(launch){
    const newNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming:true,
        customers:  ["NASA", "MIA"],
        flightNumber: newNumber
    });
    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId){
   const abortedLaunch = await Launch.updateOne({
    flightNumber: launchId
   }, {
    upcoming: false,
    success: false
   })
   console.log('Aborted Launch', abortedLaunch);
   return abortedLaunch.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    getLatestFlightNumber,
    saveLaunch,
    loadLaunchData,
    getUpcomingLaunches
}