const Teacher = require('../models/Teacher')
const { compare } = require('bcryptjs')


function checksIfTheChefsFieldsAreEmpty(body, res) {
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") return res.status(400).json({
            error: "Por favor, preencha todos os campos"
        })
    }

}
module.exports = class SessionValidator {
    async login(req, res, next) {
        try {

            const fillAllFields = checksIfTheChefsFieldsAreEmpty(req.body, res)
            if (fillAllFields) return fillAllFields

            const { email, password } = req.body

            const teachers = await Teacher.findAll({ where: { email } })
            if (teachers.length == 0)
                return res.status(404).json({
                    error: "Professor não cadastrado"
                })

            const teacher = await Teacher.findOne({ where: { email } })

            if (email != teacher.email) return res.status(404).json({
                error: "Professor não cadastrado"
            })

            const passed = await compare(password, teacher.password)

            if (!passed) return res.json({
                error: "Senha incorreta"
            })

            const teacherId = req.session.teacherId
            if (teacherId) return res.redirect(`/teachers/profile/${teacherId}`)

            if (teacher.id == req.session.teacherId) return res.status(200).redirect(`/teachers/profile/${teacherId}`)

            req.teacher = teacher

            next()
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }

    logout(req, res, next) {
        if (req.session.teacherId)
            next()
    }

    async forgot(req, res, next) {
        const { email } = req.body

        if (req.session.teacherId) return res.json({ error: "Você está logado, saia da conta para realizar o pedido" })

        const teacher = await Teacher.findOne({ where: { email } })
        if (!teacher) return res.status(404).json({ error: "Professor não cadastrado" })

        req.teacher = teacher

        next()
    }

    async reset(req, res, next) {
        const { email, password, passwordRepeat } = req.body
        const { token } = req.query

        const fillAllFields = checksIfTheChefsFieldsAreEmpty(req.body, res)
        if (fillAllFields) return fillAllFields
        
        const teacher = await Teacher.findOne({ where: { reset_token: token } })
        if(teacher.email != email) return res.status(404).json({ error: "O email para criar uma nova senha está incorreto", token })

        if (!teacher) return res.status(404).json({ error: "Professor não cadastrado", token })

        if (password !== passwordRepeat) return res.status(404).json({ error: "A senha e a repetição da senha não iguais", token })

        if (token !== teacher.reset_token) return res.status(404).json({ error: "Token inválido! Solicte uma nova recuperação de senha", token })

        let now = new Date
        now = now.setHours(now.getHours())

        if (now > teacher.reset_token_expires) return res.status(404).json({ error: "Token expirado! Solicte uma nova recuperação de senha ", token })

        req.teacher = teacher

        next()
    }
}