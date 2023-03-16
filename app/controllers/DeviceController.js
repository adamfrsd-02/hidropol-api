const db = require('../models');
const Device = db.devices;

// Create and Save a new Device
exports.create = (req, res) => {
    Device.create(req.body)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Device."
            });
        });
}

// Retrieve all Devices from the database.
exports.findAll = (req, res) => {
    Device.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving devices."
            });
        });
}


// Find latest Device by device_name
exports.findOne = (req, res) => {
    Device.find({
            device_name: req.params.device_name
        }).sort({
            createdAt: -1
        }).limit(1)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving devices."
            });
        });
}

// Update a Device by the id in the request
exports.update = (req, res) => {
    Device.findByIdAndUpdate(req.params.id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Device with id=${id}. Maybe Device was not found!`
                });
            } else res.send({
                message: "Device was updated successfully."
            });
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Device with id=" + id
            });
        });
}