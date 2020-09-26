const { compare } = require('bcryptjs')

const Teacher = require('../models/Teacher')

function checksIfFieldsIsEmpty(body, res){
    const keys = Object.keys(body)

    for(key of keys){
        if(body[key] == "") return res.status(400).json({
            message: "Preecha todos os campos"
        })
    }
}


module.exports = class TeacherValidador {
    async teacher(req, res, next) {
        try {
            const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
            if(fillAllFields) return fillAllFields

            const { email } = req.body

            const teachers = await Teacher.findAll()

            // Busca os professores cadastrados
            const registeredTeachers = teachers.find(teacher => {
                return teacher.id != req.session.teacherId
            })

            if (registeredTeachers.id != req.session.teacherId && registeredTeachers.email == email)
                return res.status(401).json({
                    message: "Email já cadastrado"
                })

            const teacher = await Teacher.findOne({ where: { id: req.params.id } })

            if (!teacher) return res.status(204).json({
                error: "Professor não encontrado"
            })

            if (req.session.teacherId != req.params.id) return res.status(401).json({
                error: "Acesso negado!"
            })

            if (teacher && req.body.password) {

                const passed = await compare(req.body.password, teacher.password)

                if (!passed) return res.json({
                    error: "Senha incorreta"
                })
            }

            next()

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }


    }
    async create(req, res, next) {
        try {
            const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
            if(fillAllFields) return fillAllFields

            if (req.session.teacherId) return res.status(400).json({
                message: "Você não pode cadastrar um novo usuário nesse momento"
            })

            const { email } = req.body

            const teachers = await Teacher.findAll()
            const registeredTeachers = teachers.find(teacher => {
                return teacher.email == email
            })
            
            if (registeredTeachers && registeredTeachers.email  == email) return res.status(401).json({
                error: "Usuário já cadastrado"
            })

            next()
        
        } catch (error) {
            console.log(error);
            
            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }
}
