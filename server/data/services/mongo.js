const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('Mongoose/Mongo Connection has started')
});
mongoose.connection.on('error', (err) => {
    console.log('An error has occured', err)
});

const connectToMongoose = async() => {
    await mongoose.connect(MONGO_URL);;
};

const disconnectFromMongoose = async() => {
    await mongoose.disconnect();
}
module.exports = { connectToMongoose , disconnectFromMongoose}