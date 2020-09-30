const Student = require('../models/Student')
const Activitie = require('../models/Activitie')

function checksIfFieldsIsEmpty(body, res) {
    const keys = Object.keys(body)

    for (student of body.students) {
        if (student.name == "") return res.status(400).json({
            message: "Os alunos não podem conter campos vázios"
        })
    }

    for (key of keys) {
        if (body[key] == "") return res.status(400).json({
            message: "Preecha todos os campos"
        })
    }
}


module.exports = class TeacherValidador {
    async activitie(req, res, next){
        const activitie = await Activitie.findOne({ where: { id: req.params.id } })
        const teacherId = req.session.teacherId

        if(activitie.teacher_id != teacherId ) return res.status(401).json({ error: "Acesso negado" })

        if(!activitie) return res.status(201).json({ error: "Nenhuma atividade encontrada" })

        next()
    }
    
    async create(req, res, next) {
        try {
            const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
            if (fillAllFields) return fillAllFields

            let {
                school,
                school_class,
                teacher_id,
                students
            } = req.body

            teacher_id = req.session.teacherId

            async function getStudent(student) {
                const registeredStudent = await Student.findOne({ where: { name: student.name } })
                
                /*if (registeredStudent.school != school || registeredStudent.school_class != school_class) return res.status(400).json({
                    error: `A atividade deve conter alunos da mesma escola e da mesma classe`
                })*/

                if (registeredStudent.name == student.name && registeredStudent.teacher_id == teacher_id) {
                    registeredStudent.note = student.note
                    student = registeredStudent


                    return student
                } else {
                    res.status(400).json({
                        error: `Você não é professor do aluno ${registeredStudent.name} `
                    })
                }
            }
            
            students = students.map(async student => await getStudent(student))
            students = await Promise.all(students)

            req.students = students

            next()

        } catch (error) {
            console.log(error);

            return res.status(400).json({
                error: "Erro inesperado aconteceu"
            })
        }
    }
}
