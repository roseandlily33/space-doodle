const {getAllPlanets} = require('../../models/planets.model');

async function httpGetAllPlanets(req, res){
    console.log('HTTP GET ALL PLANETS')
   return res.status(200).json(await getAllPlanets())
}


module.exports = {
    httpGetAllPlanets,
}