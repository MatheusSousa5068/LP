const {
  conn
} = require('../db');

async function sorteio(tipo, result, id, email) {

  const idUser = id + 1


  const sql = `
        INSERT INTO sorteio (tipo, resultado) VALUES ("${tipo}", "${result}")
    `

    const sql2 = `
        INSERT INTO realiza (id, email) VALUES ("${idUser}", "${email}")
  `

  const db = await conn();
  await db.run(sql)
  await db.run(sql2)
}

async function readLast() {
  const sql = `
        SELECT resultado FROM sorteio ORDER BY id DESC LIMIT 1;
    `
  const db = await conn();
  const last = await db.all(sql);


  return last;
}

async function readLastId() {
  const sql = `
        SELECT id FROM sorteio ORDER BY id DESC LIMIT 1;
    `
  const db = await conn();
  const last = await db.all(sql);


  return last;
}

module.exports = {
  sorteio,
  readLast,
  readLastId
}