const {
    getAllLaunches, 
    saveLaunch,
    scheduleNewLaunch, 
    existsLaunchWithId,
    abortLaunchById
} = require('../../models/launches.model')


async function httpGetAllLaunches(req, res){
   return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res){
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

async function httpAbortLaunch(req, res){
    console.log('HTTP ABORTING LAUNCH - req.params.id', req.params.id, Number(req.params.id))
    let launchId = Number(req.params.id);
    // const launch = await existsLaunchWithId(launchId);
    // if(!launch){
    //     return res.status(404).json({err: 'Launch Doesnt Exist'})
    // };
    console.log('THIS IS THE NUMBER', launchId)
    const abortingLaunch = await abortLaunchById(launchId);
    console.log('ABORTING THIS LAUNCH', abortingLaunch)
    if(!abortingLaunch){
        return res.status(400).json({err: 'Launch was not aborted'})
    }
    return res.status(200).json({ok: true});
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}