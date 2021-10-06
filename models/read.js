const {
  conn
} = require('../db');

async function readLast() {
  const sql = `
        SELECT resultado FROM sorteio ORDER BY id DESC LIMIT 1;
    `
  const db = await conn();
  const last = await db.all(sql);

  return last;
}



module.exports = {
  readLast
}