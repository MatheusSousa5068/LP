const express = require('express')
const routes = express.Router()

const { sorteioNum, readLastNumber } = require('./controllers')

routes.use(express.json())

routes.use(express.static('public'));



routes.get('/', (req, res) => {
    res.redirect('/numeros')
})

routes.get('/numeros', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

routes.post('/numeros', sorteioNum)

routes.get('/readLast', readLastNumber)


module.exports = routes