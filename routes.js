const express = require('express')
const routes = express.Router()

const { sorteioNum, readLastNumber, signup, login } = require('./controllers')

routes.use(express.json())

routes.use(express.static('public'));




// método get
routes.get('/', (req, res) => {
    res.redirect('/numeros')
})

routes.get('/numeros', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

routes.get('/signup', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
})

routes.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/login.html`)
})


// método post
routes.post('/numeros', sorteioNum)

routes.get('/readLast', readLastNumber)

routes.post('/signup', signup)

routes.post('/login', login)

module.exports = routes