const express = require('express');

const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpGetUpcomingLaunches,
    httpAbortLaunch
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.get('/upcoming', httpGetUpcomingLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch );

module.exports = launchesRouter;