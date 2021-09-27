const path = require('path');
const Database = require('sqlite-async');

const db = path.resolve(__dirname, 'database.sqlite');

async function conn() {
  return await Database.open(db);
}

module.exports = { conn, db };