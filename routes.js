const express = require('express')
const routes = express.Router()

const path = require('path')
const multer = require('multer');
const upload = multer({ dest: path.resolve(__dirname, 'uploads') });

const { sorteioNum, readLastNumber, signup, login, image} = require('./controllers')

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

routes.get('/readLast', readLastNumber)

// método post
routes.post('/numeros', sorteioNum)

routes.post('/signup', signup)

routes.post('/login', login)

routes.post('/image', upload.single('image'), image)

routes.use((error, req, res, next) => {
    res.json({ error: error.message });
})

module.exports = routes