const jwt = require('jsonwebtoken');

class AuthService {
    generateAccessToken(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.EXPIRE })
        return 'Bearer ' + accessToken
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.SECRET);
        }
        catch (e) {
            return null
        }
    }
}

module.exports = new AuthService()