const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.model');

const DEFAULT_FLIGHT_NUM = 100;

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
//launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId){
    return await launchesDatabase.findOne(launchId)
  }
async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase.findOne()
    .sort('-flightNumber');
    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUM;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches(){
    return await launchesDatabase.find({}, {
        '_id': 0, '__v': 0
    })
}

async function saveLaunch(launch){
    console.log('SAVING A LAUNCH', launch)
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {upsert: true})
}

async function scheduleNewLaunch(launch){
    console.log('SCHEDULING NEW LAUNCH');
    const planet = await launchesDatabase.findOne({
        keplerName: launch.target
    })
    if(!planet){
        throw new Error ('No matching planet was foound')
    }
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
   return await launchesDatabase.findOne({
    flightNumber: launchId
   })  
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    getLatestFlightNumber
}