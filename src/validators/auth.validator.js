const yup = require('yup')

exports.userCredentialsSchema = yup.object().shape({
    username: yup.string().trim().required().min(4).max(32),
    password: yup.string().trim().required().min(8).max(32)
})