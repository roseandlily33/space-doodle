const {getAllLaunches, addNewLaunch} = require('../../models/launches.model')


function httpGetAllLaunches(req, res){
    console.log('Getting all launches')
   return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
    const launch = req.body;
    addNewLaunch(launch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
}