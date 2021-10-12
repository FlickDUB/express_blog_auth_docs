const ApiError = require('./api.error');
const { ValidationError } = require('yup')

module.exports = function (err, req, res, next) {
    console.log('///\n', err);

    if (err instanceof ApiError) {
        let errors = err.errors?.length ? err.errors : [{ msg: err.message }]
        let result = { message: err.message, errors }
        return res.status(err.status || 400).json(result)
    }

    if (err instanceof ValidationError) {
        let errors = err.errors?.length ? err.errors.map((e) => { return { msg: e } }) : [{ msg: err.message }]
        const result = { message: err.errors[0], errors }
        return res.status(400).json(result)
    }

    let errors = err.errors ? err.errors : ['Unknown error']
    let message = { message: 'Unknown error', errors }
    return res.status(500).json(message)

};
