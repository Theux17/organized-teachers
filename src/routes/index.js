const express = require('express')
const routes =  express.Router()

const teachers = require('./teachers')

routes.use('/teachers', teachers)

routes.get('/', (req, res) => {
    return res.send("Bem vindo ao Professor Organizado, cadastre uma conta ou faça o login, para começar a se organizar")
})

module.exports = routes