const db = require('../models');
const Sensor = db.sensors;

// Create and Save a new Sensor
exports.create = (req, res) => {
    Sensor.create(req.body)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Sensor."
            });
        });
};

// Retrieve all Sensors from the database.
exports.findAll = (req, res) => {
    Sensor.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sensors."
            });
        });
};

// Find latest Sensor by device_name
exports.findOne = (req, res) => {
    Sensor.find({
            device_name: req.params.sensor_name
        }).sort({
            createdAt: -1
        }).limit(1)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sensors."
            });
        });
}

// Update a Sensor by the id in the request
exports.update = (req, res) => {
    Sensor.findByIdAndUpdate(req.params.id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Sensor with id=${id}. Maybe Sensor was not found!`
                });
            } else res.send({
                message: "Sensor was updated successfully."
            });
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Sensor with id=" + id
            });
        });
};

// Delete a Sensor with the specified id in the request
exports.delete = (req, res) => {
    Sensor.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Sensor with id=${id}. Maybe Sensor was not found!`
                });
            } else {
                res.send({
                    message: "Sensor was deleted successfully!"
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete Sensor with id=" + id
            });
        });
};

// Delete all Sensors from the database.
exports.deleteAll = (req, res) => {
    Sensor.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Sensors were deleted successfully!`
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all sensors."
            });
        });
};

//Find all the latest sensors
exports.findAllLatest = (req, res) => {
    const ph_latest = Sensor.find({
        sensor_name: 'ph_sensor'
    }).sort({
        createdAt: -1
    }).limit(1);
    const nutrition_latest = Sensor.find({
        sensor_name: 'nutrition_sensor'
    }).sort({
        createdAt: -1
    }).limit(1);
    const outer_latest = Sensor.find({
        sensor_name: 'outer_temp_sensor'
    }).sort({
        createdAt: -1
    }).limit(1);
    const water_latest = Sensor.find({
        sensor_name: 'water_temp_sensor'
    }).sort({
        createdAt: -1
    }).limit(1);

    Promise.all([ph_latest, nutrition_latest, outer_latest, water_latest])
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sensors."
            });
        });
};

// Find all published Sensors
// exports.findAllPublished = (req, res) => {
//     Sensor.find({ published: true })
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving sensors."
//             });
//         });
// };