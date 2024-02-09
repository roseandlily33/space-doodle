const {getAllLaunches} = require('../../models/launches.model')


function httpGetAllLaunches(req, res){
    console.log('Getting all launches')
   return res.status(200).json(getAllLaunches());
}

module.exports = {
    httpGetAllLaunches
}