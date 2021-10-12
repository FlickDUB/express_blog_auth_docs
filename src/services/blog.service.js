const mongoose = require('mongoose')
const { getPostMediaData } = require('../services/files.service')
const fileService = require('../services/files.service')

class BlogService {
    async getPosts(page) {
        const list_size = 20
        const offset = (page - 1) * list_size
        return await mongoose.models.Post.find().populate('author', '_id username').limit(list_size).skip(offset)
    }

    async getPostById(_id) {
        return await mongoose.models.Post.findOne({ _id }).populate('author', '_id username')
    }

    async createPost(textData, fileData, user) {
        const { title, body } = textData
        let data = { title, body, author: user.id }
        if (fileData) {
            data = { ...data, media: getPostMediaData(fileData) }
        }
        return await mongoose.models.Post.create(data)
    }

    async removePost(data) {
        return await mongoose.models.Post.deleteOne({ _id: data.id })
    }

    async updatePost(textData, fileData, post) {
        const { title, body } = textData
        let data = { title, body }
        if (fileData) {
            data = { ...data, media: getPostMediaData(fileData) }
        }

        if (data.title) {
            post.title = data.title
        }
        if (data.body) {
            post.body = data.body
        }
        if (data.media) {
            post.media = data.media
        }
        return await post.save()
    }

}

module.exports = new BlogService()