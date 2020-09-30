const express = require('express')
const routes = express.Router()

const TeacherController = require('../app/controllers/TeacherController')
const SessionController = require('../app/controllers/SessionController')
const StudentsController = require('../app/controllers/StudentsController')
const ActivitiesController = require('../app/controllers/ActivitiesController')

const SessionValidator = require('../app/validators/session')
const TeacherValidator = require('../app/validators/teacher')
const StudentValidator = require('../app/validators/student')
const ActivitieValidator = require('../app/validators/activitie')

const Session = require('../app/middlewares/session')
const { usersLoggedIn } = new Session

const teacherController = new TeacherController
const sessionController = new SessionController
const studentsController = new StudentsController
const activitiesController = new ActivitiesController

const sessionValidator = new SessionValidator
const teacherValidator = new TeacherValidator
const studentValidator = new StudentValidator
const activitieValidator = new ActivitieValidator

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

// activities
routes.get('/activities', usersLoggedIn, activitiesController.index)
routes.post('/activities', usersLoggedIn, activitieValidator.create, activitiesController.post)
routes.get('/activities/:id', usersLoggedIn, activitieValidator.activitie, activitiesController.show)
routes.put('/activities/:id', usersLoggedIn, activitieValidator.create, activitiesController.put )
routes.delete('/activities/:id', usersLoggedIn, activitiesController.delete )



module.exports = routes