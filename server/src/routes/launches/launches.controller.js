const {
    getAllLaunches, 
    scheduleNewLaunch, 
    existsLaunchWithId} = require('../../models/launches.model')


async function httpGetAllLaunches(req, res){
    console.log('HTTP GET ALL LAUNCHES')
   return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res){
    console.log('HTTP ADD NEW LAUNCH')
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target){
            return res.status(400).json({err: 'Missing a property'});
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({err: 'Not a valid date'})
    }
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res){
    console.log('HTTP ABORTING LAUNCH')
    let launchId = Number(req.params.id);
   if(!existsLaunchWithId(launchId)){
    return res.status(404).json({err: 'Launch not found'});
   }
    return res.status(200).json(launchId);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}