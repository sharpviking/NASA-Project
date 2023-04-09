const launches = new Map();

let latestflightNumber = 100;


const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('November 26,2023'),
    destination: 'kepler-442 b',
    customer: ['SHARPVIKING', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

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
module.exports = {
    getAllLaunches,
    addNewLaunch
}