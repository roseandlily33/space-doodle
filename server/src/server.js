const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config()

const {loadPlanetsData} = require('./models/planets.model');
const {getAllLaunches} = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL;
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('Mongoose/Mongo Connection has started')
});
mongoose.connection.on('error', (err) => {
    console.log('An error has occured', err)
});

async function startServer (){
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    await getAllLaunches();
    server.listen(PORT, () => {
        console.log('Listening on port', PORT)
    });
}
startServer();