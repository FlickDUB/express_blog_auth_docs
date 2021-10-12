const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const uploadMedia = require('../middlewares/uploadMedia.middleware')

router
    .get('/', blogController.blogList)
    .post('/', authMiddleware, uploadMedia('media'), blogController.createPost)
    .delete('/:id', authMiddleware, blogController.removePost)
    .put('/:id', authMiddleware, uploadMedia('media', true), blogController.updatePost)

module.exports = router