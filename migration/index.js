const {
  conn
} = require('../db');

async function up() {
  const sql = `
    CREATE TABLE IF NOT EXISTS usuario (
      email TEXT PRIMARY KEY,
      nome TEXT,
      senha TEXT
    );
  `;

  const sql2 = `
  CREATE TABLE IF NOT EXISTS sorteio (
    id INTEGER PRIMARY KEY,
    tipo TEXT,
    resultado TEXT
);
`

  const sql3 = `
    CREATE TABLE IF NOT EXISTS realiza (
      id INTEGER,
      email TEXT,
      FOREIGN KEY (id) REFERENCES sorteio(id),
      FOREIGN KEY (email) REFERENCES usuario(email)
    );`

  const db = await conn();

  await db.run(sql)
  await db.run(sql2)
  await db.run(sql3)

}


async function down() {
  const sql = `DROP TABLE usuario sorteio realiza`;

  const db = await conn();

  await db.run(sql);
}
module.exports = {
  up,
  down
};