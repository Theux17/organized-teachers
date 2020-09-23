const express = require('express')
const routes = express.Router()

const TeacherController = require('../app/controllers/TeacherController')

const teacherController = new TeacherController
const { checksIfExistsTeacher } = require('../app/validators/teacher')

routes.get('', teacherController.index)
routes.post('', teacherController.post)
routes.get('/show/:id', checksIfExistsTeacher, teacherController.show)
routes.put('/:id', checksIfExistsTeacher, teacherController.put)
routes.delete('/:id', checksIfExistsTeacher, teacherController.delete)

module.exports = routes