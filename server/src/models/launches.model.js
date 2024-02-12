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
    });
}

async function saveLaunch(launch){
    let saved = await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {upsert: true});
    return saved;
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
   const abortedLaunch = await launchesDatabase.updateOne({
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
    saveLaunch
}