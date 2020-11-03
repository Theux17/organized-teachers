const { hash } = require('bcryptjs')

const Teacher = require('../models/Teacher')
const teacherView = require('../../views/teachers_views')

module.exports = class TeacherController {

    async post(req, res) {
        try {
            let {
                name,
                email,
                password
            } = req.body

            password = await hash(password, 8)

            const teacherId = await Teacher.create({
                name,
                email,
                password
            })

            req.session.teacherId = teacherId

            const teacher = await Teacher.findOne({ where: { id: teacherId } })
            
            return res.status(201).json(teacherView.render(teacher))

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao criar o professor"
            })
        }
    }

    async show(req, res) {
        try {

            const teacher = await Teacher.findOne({ where: { id: req.params.id } })

            return res.status(200).json(teacherView.render(teacher))

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao mostrar o professor"
            })
        }
    }

    async put(req, res) {
        try {
            const id = req.params.id

            await Teacher.update(id, {
                name: req.body.name,
                email: req.body.email
            })

            const teacher = await Teacher.findOne({ where: { id } })

            return res.status(200).json(teacherView.render(teacher))

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao atualizar o professor"
            })
        }
    }

    async delete(req, res) {
        try {
            await Teacher.delete(req.params.id)
            
            req.session.destroy()

            return res.status(200).json({ 
                message: `Professor de id ${req.params.id} deletado com sucesso`
             })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao deletar o professor"
            })
        }
    }

}
