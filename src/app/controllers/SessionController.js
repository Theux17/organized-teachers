module.exports = class SessionController {
    async login(req, res) {
        req.session.teacherId = req.teacher.id
        const teacherId = req.session.teacherId

        return res.status(200).redirect(`/teachers/profile/${teacherId}`)
    }

    async logout(req, res){
        req.session.destroy()
        return res.status(200).json({
            message: "Que pena que você já vai, até a próxima!"
        })
    }
}