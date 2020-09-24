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

            const teachers = await Teacher.findAll({where: {email} })
            if(teachers.length == 0) 
            return res.status(204).json({
                error: "Professor não cadastrado"
            })

            const teacher = await Teacher.findOne({ where: { email } })

            if (email != teacher.email) return res.status(204).json({
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
}