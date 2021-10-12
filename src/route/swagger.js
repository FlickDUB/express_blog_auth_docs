/**
 * @swagger
 * components:
 *   schemas:
 *     UserCredentials:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User login
 *         password:
 *           type: string
 *           description: User password
 *     UserInfo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of user
 *         username:
 *           type: string
 *           description: User username
 *         accessToken:
 *           type: string
 *           description: Access token
 *     Author:
 *       type: object
 *       required:
 *         - _id
 *         - username
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID
 *         username:
 *           type: string
 *           description: The author name
 *     Media:
 *       type: object
 *       properties:
 *         originalname:
 *           type: string
 *         encoding:
 *           type: string 
 *         filename:
 *           type: string
 *         path:
 *           type: string 
 *         mimetype:
 *           type: string
 *         extension:
 *           type: string 
 *     Post:
 *       type: object
 *       required:
 *         - _id
 *         - body
 *         - title
 *         - createdAt
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated post ID
 *         title:
 *           type: string
 *           description: The post title
 *         body:
 *           type: string
 *           description: The post body
 *         createdAt:
 *           type: string
 *           description: The post created date
 *         author:
 *           $ref: '#/components/schemas/Author' 
 *           description: The post author
 *         media:
 *           type: object
 *           description: The post media
 *           $ref: '#/components/schemas/Media' 
 *     PostUpload:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         body:
 *           type: string
 *           description: The body of the post
 *         media:
 *           type: file
 *           description: Media file (jpg, jpeg, png, svg, gif)
 *     ApiError:
 *       type: object
 *       required:
 *         - message
 *         - errors
 *       properties:
 *         message:
 *           type: string
 *           description: The error message
 *           example: Unknown error
 *         errors:
 *           type: array
 *           description: List of errors
 *           items:
 *             type: object
 *             required:
 *               - msg
 *             properties:
 *               msg:
 *                 type: string
 *                 description: The error message
 *                 example: Unknown error
 *     PostUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         body:
 *           type: string
 *           description: The body of the post
 *         media:
 *           type: file
 *           description: Media file (jpg, jpeg, png, svg, gif)
 */


/**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login.
     *     requestBody:
     *       content: 
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserCredentials'
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Returns information about the authorized user
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserInfo'
     *       400:
     *         description: Required fields is missing or validation error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ApiError'
     */


/**
* @swagger
* /auth/register:
*   post:
*     summary: Register.
*     requestBody:
*       content: 
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserCredentials'
*     tags: [Auth]
*     responses:
*       200:
*         description: Returns information about the newly registered user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserInfo'
*       400:
*         description: Required fields is missing. User already exist. Validation error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ApiError'
*/


/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Returns a list of posts.
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page parameter needs to create pagination.
 *         schema:
 *           type : integer
 *           format: int64
 *           minimum: 1
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Returns a list of the posts. List max size - 20
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post' 
 *   post:
 *     summary: Creates a new post.
 *     requestBody:
 *       content: 
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PostUpload'
 *         encoding:
 *           media:
 *             contentType: image/png, image/jpeg, image/gif, image/svg+xml
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Returns information about the newly created message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post' 
 *       400:
 *         description: Required id param is missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       403:
 *         description: Not allowd for current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete a post.
 *     parameters:
 *       - id:
 *         in: path
 *         name: id
 *         description: ID need to identify the post.
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: JSON of deleted post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Required id param is missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       403:
 *         description: Not allowd for current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *   put:
 *     summary: Update a post.
 *     parameters:
 *       - id:
 *         in: path
 *         name: id
 *         description: ID need to identify the post.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content: 
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: JSON of updated post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Required id param is missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       403:
 *         description: Not allowd for current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 * 
 */