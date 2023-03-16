const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const sensors = require('./app/controllers/SensorController.js');

const app = express();

const corsOptions = {
    origin: '*',
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

//Connect to DB
const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

db.mongoose.connect(db.url, mongooseConfig)
    .then(() => {
        console.log('Connected to DB');
    }).catch(err => {
        console.log('Cannot connect to DB', err);
        process.exit();
    });

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Hidropol API',
        status: 200
    });
});

app.get('/api/v1/sensors/latest-data', sensors.findAllLatest);

require('./app/routes/SensorRoutes')(app);
require('./app/routes/DeviceRoutes')(app);

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
