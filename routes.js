const express = require('express');

const {
    sorteio
} = require('./models/index')
const {
    readLast
} = require('./models/read')

const app = express.Router()


const app = express()

app.use(express.json())

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.redirect('/numeros')
})

app.get('/numeros', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.post('/numeros', async (req, res) => {

    const request = req.body
    const tipo = "numero"

    const min = request[0]
    const max = request[1]

    let sort = Math.floor(Math.random() * Math.floor(max) + 1)


    while (sort < min) {
        sort = Math.floor(Math.random() * Math.floor(max));
    }


    sorteio(tipo, sort)

    res.setHeader("content-type", "application/json")
    res.sendStatus(200)
})

app.get('/readLast', async (req, res) => {
    const readNum = await readLast()

    res.setHeader("content-type", "application/json")

    res.send(JSON.stringify(readNum))
})



module.exports = {
    app
}