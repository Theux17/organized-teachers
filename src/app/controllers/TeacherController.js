const { hash } = require('bcryptjs')

const Teacher = require('../models/Teacher')

module.exports = class TeacherController {
    async index(req, res) {
        try {

            const teachers = await Teacher.findAll()

            return res.status(200).json({ teachers })
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
                email,
                password
            } = req.body

            if (name == "" || email == "" || password == "") return res.json({
                error: "Preencha os campos que faltam."
            })

            password = await hash(password, 8)

            const teacherId = await Teacher.create({
                name,
                email,
                password
            })

            req.session.teacherId = teacherId

            return res.status(201).redirect(`/teachers/profile/${teacherId}`)

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async show(req, res) {
        try {

            const teacher = await Teacher.findOne({ where: { id: req.params.id } })

            return res.json({ 
                name: teacher.name,
                email: teacher.email 
            })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
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

            return res.status(200).json({
                message: "Atualizado com sucesso"
            })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async delete(req, res) {
        try {
            await Teacher.delete(req.params.id)
            req.session.destroy()

            return res.status(200).json({ 
                message: `Usuário de id ${req.params.id} deletado com sucesso`
             })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

}
