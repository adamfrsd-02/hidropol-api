module.exports = app => {
    const devices = require('../controllers/DeviceController.js');
    var router = require('express').Router();

    // Create a new Device
    router.post('/', devices.create);

    // Retrieve all Devices
    router.get('/', devices.findAll);

    // Retrieve a single Device with id
    router.get('/:device_name', devices.findOne);


    app.use('/api/v1/devices', router);
}