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
  

  module.exports = { sorteio }