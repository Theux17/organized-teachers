module.exports = class Session {
    usersLoggedIn(req, res, next) {
        if(!req.session.teacherId) return res.status(401).json({
           message: 'Faça o login ou cadastre uma nova conta.'
        })

        next()
    }

} 