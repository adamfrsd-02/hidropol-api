const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

module.exports = {
    mongoose,
    url: dbConfig.url,
    sensors: require('./SensorModel.js')(mongoose),
    devices: require('./DeviceModel.js')(mongoose),
}