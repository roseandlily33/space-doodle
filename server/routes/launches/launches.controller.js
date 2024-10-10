const {
    getAllLaunches, 
    saveLaunch,
    scheduleNewLaunch, 
    existsLaunchWithId,
    abortLaunchById
} = require('../../models/launches.model')
const {getPagination} = require('../../data/services/query');


async function httpGetAllLaunches(req, res){
    console.log(req.query);
    const {skip,  limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit)
    return res.status(200).json(launches);
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
    let launchId = Number(req.params.id);
    const abortingLaunch = await abortLaunchById(launchId);
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