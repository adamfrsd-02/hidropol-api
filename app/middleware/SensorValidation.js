const {
    check,
    validationResult
} = require("express-validator")

exports.sensorValidation = [
    check('sensor_name').not().isEmpty().withMessage('Sensor name is required'),
    check('value').not().isEmpty().withMessage('Value is required'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({
            [err.param]: err.msg,
            status: 422
        }))
        return res.status(422).json({
            errors: extractedErrors,
        })
    }
]