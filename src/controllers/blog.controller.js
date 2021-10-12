const ApiError = require('../middlewares/api.error')
const blogService = require('../services/blog.service')
const { paginationSchema, postIdSchema, postDataSchema } = require('../validators/blog.validator')

class BlogController {
    async blogList(req, res, next) {
        try {
            const isPageValid = await paginationSchema.isValid(req.query)
            const page = !isPageValid ? 1 : req.query.page

            res.json(await blogService.getPosts(page))
        } catch (e) {
            next(e)
        }
    }

    async createPost(req, res, next) {
        try {
            await postDataSchema.validate(req.body, { abortEarly: false })
            res.json(await blogService.createPost(req.body, req.file, req.user))
        } catch (e) {
            next(e)
        }
    }

    async removePost(req, res, next) {
        try {
            await postIdSchema.validate(req.params, { abortEarly: false })
            let result = await blogService.getPostById(req.params.id)
            if (!result) throw new ApiError(404 ,'Post not found!')
            if (result?.author._id.toString() !== req.user.id) throw new ApiError(403, 'Not allowed!')

            result = await result.remove()
            res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async updatePost(req, res, next) {
        try {
            res.json(await blogService.updatePost(req.body, req.file, req.postCandidate))
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new BlogController()