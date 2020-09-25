const express = require('express')
const routes = express.Router()

const TeacherController = require('../app/controllers/TeacherController')
const SessionController = require('../app/controllers/SessionController')
//const ActivitiesController = require('../app/controllers/ActivitiesController')
const StudentsController = require('../app/controllers/StudentsController')


const SessionValidator = require('../app/validators/session')
const TeacherValidator = require('../app/validators/teacher')

const Session = require('../app/middlewares/session')
const { usersLoggedIn } = new Session

const teacherController = new TeacherController
const sessionController = new SessionController
const studentsController = new StudentsController
// const activitiesController = new ActivitiesController

const sessionValidator = new SessionValidator
const teacherValidator = new TeacherValidator

routes.post('/login', sessionValidator.login, sessionController.login )
routes.post('/logout', usersLoggedIn, sessionValidator.logout, sessionController.logout )

// teachers
routes.post('', teacherValidator.create, teacherController.post)
routes.get('/profile/:id', usersLoggedIn, teacherValidator.teacher, teacherController.show)
routes.put('/:id', usersLoggedIn, teacherValidator.teacher, teacherController.put)
routes.delete('/:id', usersLoggedIn, teacherValidator.teacher, teacherController.delete)

// students
routes.post('/students', usersLoggedIn, studentsController.post)
routes.get('/students/:id', usersLoggedIn, studentsController.show)
routes.put('/students/:id', usersLoggedIn, studentsController.put )
routes.delete('/students/:id', usersLoggedIn, studentsController.delete )



module.exports = routes