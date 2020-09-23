const Teacher = require('../models/Teacher')

async function checksIfExistsTeacher(req, res, next) {
    const id = req.params.id

    const teacher = await Teacher.findOne({ where: { id } })
    
    if(!teacher) return res.status(204).json({
        error: "Professor não encontrado"
    })

    next()
}

module.exports = { checksIfExistsTeacher }