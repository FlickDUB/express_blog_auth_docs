const { Schema, model } = require('mongoose')

module.exports = model('Post', new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    media: {
        type: Object, required: false,
    }
}, { versionKey: false }))