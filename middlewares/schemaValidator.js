const _ = require('lodash');
const schemas = require('../models/index');

module.exports = (useJoiError = false) => {
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put', 'get'];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false,  // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true  // remove unknown keys from the validated data
    };
    console.log(process.env)

    // return the validation middleware
    return (req, res, next) => {
        try {
            const route = req.route.path;
            const method = req.method.toLowerCase();

            if (_.includes(_supportedMethods, method) && _.has(schemas, route)) {
                // get schema for the current route
                const _schema = _.get(schemas, route);

                if (_schema) {

                    // Validate req.body using the schema and validation options
                    const {error, value} = _schema.validate(req.body);
                    console.log(value)
                    if (error) {
                        // Joi Error
                        const JoiError = {
                            status: 'failed',
                            error: {
                                original: error._object,
                                // fetch only message and type from each error
                                details: _.map(error.details, ({ message, type }) => ({
                                    message: message.replace(/['"]/g, ''),
                                    type
                                }))
                            }
                        };

                        // Custom Error
                        const CustomError = {
                            status: 'failed',
                            error: 'Invalid request data. Please review request and try again.'
                        };

                        // Send back the JSON error response
                        res.status(422).json(_useJoiError ? JoiError : CustomError);
                    } else {
                        // Replace req.body with the data after Joi validation
                        req.body = value;
                        next();
                    }
                }
            }
        }
        catch (err) {
            next(err)
        }

    };
};