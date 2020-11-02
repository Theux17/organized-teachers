const crypto = require('crypto')
const { hash } = require('bcryptjs')

const Teacher = require('../models/Teacher')
const mailer = require('../lib/mailer')

module.exports = class SessionController {
    async login(req, res) {
        req.session.teacherId = req.teacher.id
        const teacherId = req.session.teacherId

        return res.status(200).redirect(`/teachers/profile/${teacherId}`)
    }

    async logout(req, res) {
        req.session.destroy()
        return res.status(200).json({
            message: "Que pena que você já vai, até a próxima!"
        })
    }

    async forgot(req, res) {
        try {
            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date
            now = now.setHours(now.getHours() + 1)

            const teacher = req.teacher

            await Teacher.update(teacher.id, {
                reset_token: token,
                reset_token_expires: now
            })

            await mailer.sendMail({
                to: teacher.email,
                from: 'professor-organizado@gmail.com',
                subject: 'Cadastre uma nova senha',
                html: `
                    <h2>Esqueceu a senha ?</h2>
                    <p>Não se preocupe, cadastre uma nova senha entrando link abaixo.<p>
                    <p>
                        <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/teachers/password-reset?token=${token}">
                            Recuperar Senha
                        <a>
                    <p>
                `
            })

            return res.status(400).json({
                message: "Pedido realizado com sucesso! Verifique o seu email para resetar a senha"
            })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao realizar pedido de nova senha"
            })
        }

    }

    async reset(req, res) {
        const { teacher, token } = req
        
        try {
            const { password } = req.body

            const newPassword = await hash(password, 8)

            await Teacher.update(teacher.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            return res.status(200).json({
                message: "Senha atualizada com sucesso!"
            })

        } catch (error) {
            console.error(error)
            return res.status(400).json({
                error: "Erro inesperado ao cadastrar uma nova senha",
                token
            })
        }
    }
}