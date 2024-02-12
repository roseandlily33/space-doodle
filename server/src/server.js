const http = require('http');
const {connectToMongoose} = require('./services/mongo');
const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model');
const {getAllLaunches} = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer (){
    await connectToMongoose();
    await loadPlanetsData();
    await getAllLaunches();
    server.listen(PORT, () => {
        console.log('Listening on port', PORT)
    });
}
startServer();