const fs = require('fs');
const express = require('express');

const Migration = require('./migration');
const { db } = require('./db');

const routes = require('./routes')
const app = express();


(async () => {
  if (!fs.existsSync(db)) {
    await Migration.up();
  }
})();


app.use('/', routes)


app.listen(1234, () => console.log(`servidor rodando em: http://localhost:1234`))