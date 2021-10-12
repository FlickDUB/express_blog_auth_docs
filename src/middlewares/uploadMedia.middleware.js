const multer = require("multer");
const { v4: uuid4 } = require('uuid');
const fileService = require('../services/files.service')
const fs = require('fs');
const ApiError = require("./api.error");
const { postIdSchema } = require("../validators/blog.validator");
const { getPostById } = require("../services/blog.service");
const allowedExtensions = ['png', 'jpg', 'gif', 'jpeg', 'svg']


module.exports = (nameField, update = false) => async function (req, res, next) {
    try {
        let filename = null;
        if (update) {
            await postIdSchema.validate(req.params, { abortEarly: false })
            const postCandidate = await getPostById(req.params.id)
            if (!postCandidate) throw new ApiError(404, 'Post not found!')
            if (postCandidate?.author._id.toString() !== req.user.id) throw new ApiError(403, 'Not allowed!')
            req.postCandidate = postCandidate
            filename = postCandidate.media.filename
        }
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                fs.mkdirSync(process.env.UPLOAD_PATH, { recursive: true })
                cb(null, process.env.UPLOAD_PATH)
            },
            filename: function (req, file, cb) {
                const extension = fileService.getFileExtension(file.originalname)
                if (!allowedExtensions.includes(extension.toLowerCase())) next(ApiError.BadRequest(`This is not image! Allowed image extensions ${allowedExtensions.toString()}`))
                if (update) {
                    cb(null, filename)
                } else {
                    cb(null, `${uuid4()}.${extension}`)
                }
            }
        })
        multer({ storage }).single(nameField)(req, res, next)
    }
    catch (e) {
        next(e)
    }
}