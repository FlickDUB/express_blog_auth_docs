const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require('compression')
const authRouter = require('./auth.router');
const blogRouter = require('./blog.router');
const errorMiddleware = require("../middlewares/error.middleware");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
require('../models')

//* swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Server API",
            version: "1.0.0",
            description: "A simple blog API",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3001}`,
                description: "Dev server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization"
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/route/swagger.js"],
};

if (process.env.HOSTNAME) {
    options.definition.servers.unshift({ url: process.env.HOSTNAME, description: "Deployed serve" })
}

const app = express();


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(options)));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression())
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
    res.send('<a href="/api-docs">Swagger API</a>')
})
app.use('/auth', authRouter)
app.use('/blog', blogRouter)

app.use(errorMiddleware)


module.exports = app