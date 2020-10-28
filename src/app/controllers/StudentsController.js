const Student = require('../models/Student')

module.exports = class StudentsController {
    async index(req, res) {
        try {
            const students = await Student.findAll({ where: { teacher_id: req.session.teacherId } })

            return res.status(200).json({
                students
            })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async post(req, res) {
        try {
            let {
                name,
                school,
                school_class,
            } = req.body

            const studentId = await Student.create({
                name,
                school,
                school_class,
                teacher_id: req.session.teacherId
            })

            return res.status(200).redirect(`/teachers/students/${studentId}`)

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async show(req, res) {
        try {
            const teacher = await Student.findOne({ where: { id: req.params.id } })

            return res.status(200).json({
                teacher
            })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async put(req, res) {

        try {

            await Student.update(req.params.id, {
                name: req.body.name,
                school: req.body.school,
                school_class: req.body.school_class,
            })

            return res.status(200).json({
                message: "Atualizado com sucesso."
            })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async delete(req, res) {
        try {
            await Student.delete(req.params.id)

            res.status(200).json({
                message: `Aluno com o id ${req.params.id} deletado com sucesso.`
            })
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }
}

