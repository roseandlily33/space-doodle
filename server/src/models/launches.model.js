const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100, 
    mission: 'Kepler Exporation X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customers: ['NASA', 'MIP'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches(){
    return Array.from(launches.values())
}
function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(launch.flightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ["NASA", "MIA"],
        upcoming: true,
        success: true
    }));
}

module.exports = {
    getAllLaunches,
    addNewLaunch
}