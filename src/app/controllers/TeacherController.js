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
            const {
                name,
                email,
                password
            } = req.body

            if (name == "" || email == "" || password == "") return res.json({
                error: "Preencha os campos que faltam."
            })

            const teacherId = await Teacher.create({
                name,
                email,
                password
            })

            return res.status(201).redirect(`/teachers/show/${teacherId}`)

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async show(req, res) {
        try {

            const teacher = await Teacher.findOne({ where: { id: req.params.id } })

            return res.json({ teacher })
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    async put(req, res) {
        try {
            const id = req.params.id

            const teacher = await Teacher.findOne({ where: { id } })

            if (req.body.password != teacher.password) return res.json({
                error: "Senha incorreta"
            })

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

            const teachers = await Teacher.findAll()

            return res.status(200).json({ teachers })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

}
