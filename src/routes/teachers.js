const express = require('express')
const routes = express.Router()

const TeacherController = require('../app/controllers/TeacherController')
const SessionController = require('../app/controllers/SessionController')
const StudentsController = require('../app/controllers/StudentsController')

const SessionValidator = require('../app/validators/session')
const TeacherValidator = require('../app/validators/teacher')
const StudentValidator = require('../app/validators/student')

const Session = require('../app/middlewares/session')
const { usersLoggedIn } = new Session

const teacherController = new TeacherController
const sessionController = new SessionController
const studentsController = new StudentsController

const sessionValidator = new SessionValidator
const teacherValidator = new TeacherValidator
const studentValidator = new StudentValidator

routes.post('/login', sessionValidator.login, sessionController.login )
routes.post('/logout', usersLoggedIn, sessionValidator.logout, sessionController.logout )

// teachers
routes.post('', teacherValidator.create, teacherController.post)
routes.get('/profile/:id', usersLoggedIn, teacherValidator.teacher, teacherController.show)
routes.put('/:id', usersLoggedIn, teacherValidator.teacher, teacherController.put)
routes.delete('/:id', usersLoggedIn, teacherValidator.teacher, teacherController.delete)

// students
routes.post('/students', usersLoggedIn, studentValidator.create, studentsController.post)
routes.get('/students/:id', usersLoggedIn, studentValidator.student, studentsController.show)
routes.put('/students/:id', usersLoggedIn, studentValidator.student, studentsController.put )
routes.delete('/students/:id', usersLoggedIn, studentValidator.student, studentsController.delete )


module.exports = routes