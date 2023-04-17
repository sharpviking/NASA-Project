const http = require('http');

const mongoose = require('mongoose');

const app = require('./app');


const { loadPlanetsData } = require('./models/planets.model');


const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb+srv://nasa-api:fzlp4QOQL4iYEnQh@nasacluster.r0u69vi.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function startServer() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        // useFindAndModify: false, => "no longer supported in mongoose"
        // useCreateIndex: true,   => "no longer supported in mongoose"
        useUnifiedTopology: true,
    });
    await loadPlanetsData();


    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
}

startServer();