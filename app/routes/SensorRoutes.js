const {
    sensorValidation
} = require('../middleware/SensorValidation.js');

module.exports = app => {
    const sensors = require('../controllers/SensorController.js');
    var router = require('express').Router();

    // Create a new Sensor
    router.post('/', sensorValidation, sensors.create);

    // Retrieve all Sensors
    router.get('/', sensors.findAll);

    // Retrieve a single Sensor with id
    router.get('/:sensor_name', sensors.findOne);

    // Delete a Sensor with id
    router.delete('/', sensors.deleteAll);


    app.use('/api/v1/sensors', router);
}