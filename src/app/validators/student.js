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
            const student = await Student.findOne({ where: { teacher_id: req.session.teacherId } })

            if (!student) return res.status(201).json({
                error: "Você não tem alunos cadastrado"
            })

            if (student.id != req.params.id) return res.status(401).json({
                error: "Você não é professor desse aluno"
            })

            next()
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }
}