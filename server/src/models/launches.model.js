const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');


const launches = new Map();

let latestflightNumber = 100;


const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('November 26,2023'),
    target: 'kepler-442 b',
    customers: ['SHARPVIKING', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}


async function getAllLaunches() {
    return await launchesDatabase
        .find({}, { '_id': 0, '__v': 0 });
}


async function saveLaunch(launch) {
    const planet = await planet.findOne({
        keler_name: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found!');
    }


    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}

function addNewLaunch(launch) {
    latestflightNumber++;
    launches.set(
        latestflightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['Sharpviking', 'ISRO'],
            flightNumber: latestflightNumber,
        })
    )
};

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}