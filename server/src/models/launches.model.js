
const launches = new Map();

let latestFlightNumber = 100;

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

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId)
  }

function getAllLaunches(){
    return Array.from(launches.values())
}

async function scheduleNewLaunch(launch){
    launches.set(launch.flightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ["NASA", "MIA"],
        upcoming: true,
        success: true
    }));
    console.log('AlL THE LAUNCHES IN ADD', launches);

}
function abortLaunchById(launchId){
    const abortedLaunch = launches.get(launchId);
    abortedLaunch.upcoming = false;
    abortedLaunch.success = false;
    return abortedLaunch;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}