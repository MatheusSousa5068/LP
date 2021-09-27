const fs = require('fs');
const express = require('express');
const nunjucks = require('nunjucks');

const Migration = require('./migration');
const { db } = require('./db');
const { sorteio } = require('./models/index')


const app = express()

app.use(express.json())

app.use(express.static('public'));

app.set('view engine', 'njk');

nunjucks.configure('src/views', {
  express: app,
  autoescape: true,
  noCache: true,
});

(async () => {
  if (!fs.existsSync(db)) {
    await Migration.up();
  }
})();


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

  let sort = Math.floor(Math.random()*Math.floor(max) + 1)


  while(sort<min){
    sort = Math.floor(Math.random()*Math.floor(max));
  }
  
  sorteio(tipo, sort)

  console.log(sort)

  res.setHeader("content-type", "application/json") 
  res.sendStatus(200)
})


app.listen(1234, () => console.log(`servidor rodando em: http://localhost:1234`))