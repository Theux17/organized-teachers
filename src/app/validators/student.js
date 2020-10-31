const Student = require('../models/Student')

function checksIfFieldsIsEmpty(body, res) {
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") return res.status(400).json({
            message: "Preecha todos os campos"
        })
    }
}

module.exports = class StudentValidator {
    async student(req, res, next) {
        try {
            const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
            if (fillAllFields) return fillAllFields

            // aluno do professor
            const student = await Student.findOne({ where: { id: req.params.id } })

            if (student == undefined) return res.status(201).json({
                error: "O aluno não existe"
            })

            if (student.teacher_id != req.session.teacherId) return res.status(401).json({
                error: "Você não é professor desse aluno"
            })

            next()
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }

    }
    create(req, res, next) {
        const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
        if (fillAllFields) return fillAllFields

        next()
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

            let students = await Student.findAll({ where: { teacher_id } })

            if (filter || page || limit) {
                students = await Student.paginate(params, 'name', teacher_id)
                if (students.length == 0) return res.status(400).json({ error: "Sem dados para mostrar" })
                students = students.filter(student => {
                    if (student.teacher_id == teacher_id) return student
                })
            }

            req.students = students

            next()
        } catch (error) {
            console.error(error)
        }
    }
}