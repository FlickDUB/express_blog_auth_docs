const { validateAccessToken } = require('../services/auth.service');
const ApiError = require('./api.error');

module.exports = async function (req, res, next) {
    try {
        let token = req.headers?.authorization
        if (!token) throw ApiError.UnauthorizedError()

        token = token && token.split(' ')
        if (token.length < 2) throw ApiError.BadRequest('Invalid Bearer token!')

        const decodedData = validateAccessToken(token[1])
        if (!decodedData) throw ApiError.UnauthorizedError()

        req.user = decodedData
        next()
    } catch (e) {
        next(e)
    }
};
