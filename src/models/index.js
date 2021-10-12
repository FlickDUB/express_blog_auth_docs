require('./post.model')
require('./user.model')

const NUM = 57


const mongoose = require('mongoose')
const { registerUser } = require('../services/user.service')

init().catch(e => console.log(e))
async function init() {
    let user = await mongoose.models.User.findOne({ username: 'test' })
    if (!user) {
        user = await registerUser({ username: 'test', password: 'admin123' })
    }

    let count = await mongoose.models.Post.find().count()
    if (count == 0) {
        for (let i = 0; i < NUM; i++) {
            await mongoose.models.Post.create({ title: `test title ${i}`, body: `test body ${i}`, author: user._id})
        }
    }
}