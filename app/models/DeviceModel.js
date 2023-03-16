module.exports = mongoose => {
    var schema = mongoose.Schema({
        device_name: String,
        status: Boolean,
    }, {
        timestamps: true
    });

    schema.method("toJSON", function () {
        const {
            __v,
            _id,
            ...object
        } = this.toObject();
        object.id = _id;

        return object;
    });

    const Device = mongoose.model("device", schema);
    return Device;
};