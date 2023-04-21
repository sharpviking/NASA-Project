const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://nasa-api:fzlp4QOQL4iYEnQh@nasacluster.r0u69vi.mongodb.net/?retryWrites=true&w=majority";



mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
})


async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}


module.exports = {
    mongoConnect,
    mongoDisconnect
}