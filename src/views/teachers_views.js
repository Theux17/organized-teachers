module.exports = {
    render(teacher) {
        return {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            created_at: teacher.created_at,
            updated_at: teacher.updated_at
        }
    }
}