const launches = new Map();

let latestflightNumber = 100;


const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('November 26,2023'),
    target: 'kepler-442 b',
    customer: ['SHARPVIKING', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}


function getAllLaunches() {
    return Array.from(launches.values());
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