const ApiError = require('../middlewares/api.error')
const userService = require('../services/user.service')
const authService = require('../services/auth.service')
const { userCredentialsSchema } = require('../validators/auth.validator')
const bcrypt = require('bcrypt')

class AuthController {
    async register(req, res, next) {
        try {
            await userCredentialsSchema.validate(req.body, { abortEarly: false })
            let candidate = await userService.findUserByName(req.body.username)
            if (candidate) throw ApiError.BadRequest(`User with name "${req.body.username}" already exist!`)

            const user = await userService.registerUser(req.body)

            const accessToken = authService.generateAccessToken({ id: user._id, username: user.username })
            res.json({ _id: user._id, username: user.username, accessToken })
        }
        catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            await userCredentialsSchema.validate(req.body, { abortEarly: false })
            let user = await userService.findUserByName(req.body.username)
            if (!user) throw ApiError.BadRequest(`User with name "${req.body.username}" doesn't exist!`)

            let isPasswordEqual = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordEqual) throw ApiError.BadRequest(`Wrong password!`)

            const accessToken = authService.generateAccessToken({ id: user._id, username: user.username })
            res.json({ _id: user._id, username: user.username, accessToken })
        }
        catch (e) {
            next(e)
        }
    }

}

module.exports = new AuthController()