const db = require('../../config/db')

function find(filters, table) {
    try {
        let query = `SELECT * FROM ${table}`

        if (filters) {

            Object.keys(filters).map(key => {
                query += ` ${key} `

                Object.keys(filters[key]).map(field => {
                    query += `${field} = '${filters[key][field]}'`
                })
            })

        }
        return db.query(query)
    } catch (error) {
        console.log(error)
    }

}

const Base = {
    init({ table }) {
        if (!table) throw Error('invalid params')
        this.table = table
        return this
    },
    async create(fields) {
        try {
            let keys = [],
                values = []
            Object.keys(fields).map(key => {
                keys.push(key)
                values.push(`'${fields[key]}'`)
            })

            const query = `
            INSERT INTO ${this.table}
            (${keys.join(",")})
            VALUES (${values.join(",")})
            RETURNING id
            `

            const results = await db.query(query)
            return results.rows[0].id

        } catch (error) {
            console.error(error)
        }
    },
    async findAll(filters) {
        const results = await find(filters, this.table)
        return results.rows
    },
    async findOne(filters) {
        try {
            const results = await find(filters, this.table)

            return results.rows[0]

        } catch (error) {
            console.error(error)
        }
    },
    async paginate(params, columnName, teacherId) {
        const { limit, offset, filter } = params

        let query = `SELECT * FROM ${this.table}`

        if (filter) {
            query = `${query}
                WHERE unaccent(${this.table}.${columnName}) ILIKE '%${filter}%' 
                OR ${this.table}.${columnName} ILIKE '%${filter}%'
            `
        }
        if(!filter) query = `${query} 
            WHERE ${this.table}.teacher_id = ${teacherId}
        `

        query = `
            ${query}         
            LIMIT $1 OFFSET $2
        `
        const results = await db.query(query, [limit, offset])

        return results.rows
    },
    async update(id, fields) {
        try {
            let update = []

            Object.keys(fields).map(key => {
                const line = `${key} = '${fields[key]}'`
                update.push(line)
            })

            const query = `
            UPDATE ${this.table} SET
            ${update.join(',')}
            WHERE id = ${id}
            `

            return db.query(query)


        } catch (error) {
            console.error(error)
        }
    },
    async delete(id) {
        return db.query(`DELETE FROM ${this.table} WHERE id = ${id}`)
    }

}

module.exports = Base