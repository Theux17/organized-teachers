const Student = require('../models/Student')

module.exports = class StudentsController {
    async post(req, res) {
        try {
            let {
                name,
                school,
                school_class,
                activity_note,
                activity_id,
                teacher_id
            } = req.body

            activity_note = String(activity_note)
            activity_note = activity_note.replace(/\D/g, "")
            activity_note = activity_note.replace(/\,/g, ".")
            activity_note = Number(activity_note)

            const studentId = await Student.create({
                name,
                school,
                school_class,
                activity_note,
                activity_id: 1,
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
            let { activity_note } = req.body
            activity_note = String(activity_note)
            activity_note = activity_note.replace(/\D/g, "")
            activity_note = activity_note.replace(/\,/g, ".")
            activity_note = Number(activity_note)

            await Student.update(req.params.id, {
                name: req.body.name,
                school: req.body.school,
                school_class: req.body.school_class,
                activity_note
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

