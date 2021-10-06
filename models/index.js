const {
  conn
} = require('../db');

async function sorteio(tipo, result) {
  const sql = `
        INSERT INTO sorteio (tipo, resultado) VALUES ("${tipo}", "${result}")
    `
  const db = await conn();
  await db.run(sql)
}

async function readLast() {
  const sql = `
        SELECT resultado FROM sorteio ORDER BY id DESC LIMIT 1;
    `
  const db = await conn();
  const last = await db.all(sql);

  return last;
}


module.exports = {
  sorteio, readLast
}