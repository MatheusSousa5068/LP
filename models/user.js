const bcrypt = require('bcrypt')
const {
    conn
} = require('../db')

const saltRounds = 10

async function create(email, nome, senha) {
    const db = await conn()

    
    const hash = await bcrypt.hash(senha, saltRounds)

    const sql = `
        INSERT INTO
            usuario (email, nome, senha)
        VALUES
            ("${email}", "${nome}", "${hash}")
  `;

    

    const {
        lastID
    } = await db.run(sql)

    return lastID
};


async function verification(email) {
    const db = await conn()

    const sql = `
        SELECT * FROM usuario where email = "${email}"
    `

    const userRequested = await db.get(sql)

    return userRequested
}


module.exports = { create, verification }