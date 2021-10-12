const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


class UserService {
    async findUserByName(username) {
        return await mongoose.models.User.findOne({ username })
    }

    async findUserById(id) { //!
        return await mongoose.models.User.findOne({ _id: id })
    }

    async registerUser(userData) {
        const password = await bcrypt.hash(userData.password, 10)
        return await mongoose.models.User.create({ ...userData, password })
    }
}

module.exports = new UserService()