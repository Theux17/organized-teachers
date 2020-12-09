const Activitie = require('../models/Activitie')

module.exports = class ActivitiesController {
    async index(req, res) {
        try {
            const activities = req.activities

            return res.status(200).json(activities)
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao listar todas as atividades"
            })
        }
    }

    async post(req, res) {
        try {
            let {
                activitie_name,
                school,
                school_class,
                school_subjects,
                activity_date,
                teacher_id,
                students
            } = req.body

            teacher_id = req.session.teacherId

            students = req.students
            students = JSON.stringify(students)

            const activitieId = await Activitie.create({
                activitie_name,
                school,
                school_class,
                school_subjects,
                activity_date,
                teacher_id,
                students
            })

            const activitie = await Activitie.findOne({ where: { id: activitieId } })

            return res.status(201).json(activitie)

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao cadastrar uma nova atividade"
            })
        }
    }

    async show(req, res) {
        try {
            const activitie = await Activitie.findOne({ where: { id: req.params.id } })

            return res.status(200).json({ activitie })
        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao mostrar a atividade"
            })
        }
    }

    async put(req, res) {
        try {
            const id = req.params.id

            let students = JSON.stringify(req.students)

            await Activitie.update(id, {
                activitie_name: req.body.activitie_name,
                school: req.body.school,
                school_class: req.body.school_class,
                school_subjects: req.body.school_subjects,
                activity_date: req.body.activity_date,
                students: students
            })

            const activitie = await Activitie.findOne({ where: { id } })

            return res.status(200).json(activitie)

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao atualizar a atividade"
            })
        }
    }

    async delete(req, res) {
        try {
            await Activitie.delete(req.params.id)

            return res.status(200).json({
                message: `Atividade de id ${req.params.id} deletado com sucesso`
            })

        } catch (error) {
            return res.status(400).json({
                error: "Erro inesperado ao deletar a atividade"
            })
        }
    }

}
