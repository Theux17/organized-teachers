const express = require('express')
const routes = require('./routes')
const session = require('./config/session')

const app = express()

app.use(session)

app.use(express.urlencoded({extended: true }))
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
    console.log("Server is running")
})

app.use((req, res) => {
    res.status(404).json({
        error: "Rota não encontrada"
    })
})