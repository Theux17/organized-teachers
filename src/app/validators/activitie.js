const Student = require('../models/Student')
const Activitie = require('../models/Activitie')

function checksIfFieldsIsEmpty(body, res) {
    const keys = Object.keys(body)

    for (student of body.students) {
        if (student.name == "") return res.status(400).json({
            message: "Os alunos não podem conter campos vázios"
        })
    }

    for (key of keys) {
        if (body[key] == "") return res.status(400).json({
            message: "Preecha todos os campos"
        })
    }
}


module.exports = class TeacherValidador {
    async activitie(req, res, next) {
        try {
            const activitie = await Activitie.findOne({ where: { id: req.params.id } })
            const teacherId = req.session.teacherId

            if (!activitie) return res.status(201).json({ error: "Nenhuma atividade encontrada" })

            if (activitie.teacher_id != teacherId) return res.status(401).json({ error: "Acesso negado" })

            next()
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async create(req, res, next) {
        try {
            const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
            if (fillAllFields) return fillAllFields

            let {
                school,
                school_class,
                teacher_id,
                students
            } = req.body

            teacher_id = req.session.teacherId

            const activitie = await Activitie.findOne({ where: { id: req.params.id } })

            if (!activitie) return res.status(404).json({ error: "A atividade não existe" })

            if (activitie && activitie.teacher_id != teacher_id) return res.status(401).json({ error: "Acesso negado" })

            let registeredStudent = {}
            const registeredStudents = await Student.findAll({ where: { teacher_id } })
            const getTeacherStudent = student => registeredStudents.find(teacherStudent => {
                if (teacherStudent.name == student.name) {
                    registeredStudent = teacherStudent
                    return registeredStudent
                }
            })

            for (student of students) {
                getTeacherStudent(student)

                if (registeredStudent && registeredStudent.name == student.name && registeredStudent.teacher_id == teacher_id) registeredStudent

                if (registeredStudent.teacher_id != teacher_id) return res.status(400).json({
                    error: `Você não tem nehum aluno(a) com o nome "${student.name}"`
                })

                if (registeredStudent.name != student.name) return res.status(400).json({
                    error: `Verifique se o nome do aluno(a) "${student.name}" está correto`
                })

                if (registeredStudent.school != school) return res.status(400).json({
                    error: `Aluno(a) "${registeredStudent.name}" não pertence a escola ${school}`
                })

                if (registeredStudent.school_class != school_class) return res.status(400).json({
                    error: `Aluno(a) "${registeredStudent.name}" não pertence a classe ${school_class}, e sim a classe ${registeredStudent.school_class}`
                })

            }

            async function getStudent(student) {
                getTeacherStudent(student)

                if (registeredStudent.name == student.name && registeredStudent.teacher_id == teacher_id) {
                    registeredStudent.note = student.note
                    return student = registeredStudent
                }

                return student
            }

            students = students.map(async student => await getStudent(student))
            students = await Promise.all(students)

            req.students = students

            next()

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async paginate(req, res, next) {
        try {

            let { filter, page, limit } = req.query
            page = page || 1
            limit = limit || 8
            let offset = limit * (page - 1)

            const params = {
                filter,
                page,
                limit,
                offset
            }

            const teacher_id = req.session.teacherId

            let activities = await Activitie.findAll({ where: { teacher_id } })

            if (filter || page || limit) {
                activities = await Activitie.paginate(params, 'activitie_name', teacher_id)
                activities = activities.filter(activitie => {
                    if (activitie.teacher_id == teacher_id) return activitie
                })
                if (activities.length == 0) return res.status(400).json({ error: "Nenhum resultado foi encontrado" })
            }

            req.activities = activities

            next()
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }
}
