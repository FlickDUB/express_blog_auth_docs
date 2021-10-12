const yup = require('yup')

exports.paginationSchema = yup.object().shape({
    page: yup.number().min(1)
})

exports.postIdSchema = yup.object().shape({
    id: yup.string().trim().required()
})

exports.postDataSchema = yup.object().shape({
    body: yup.string().trim().required(),
    title: yup.string().trim().required()
})