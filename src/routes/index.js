const express = require('express')
const routes =  express.Router()

const teachers = require('./teachers')

routes.use('/teachers', teachers)

module.exports = routes