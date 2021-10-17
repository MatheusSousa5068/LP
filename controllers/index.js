const {
    sorteio,
    readLast,
    readLastId
} = require('../models/index')
const {
    create,
    verification
} = require('../models/user')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const sorteioNum = async (req, res) => {
    const request = req.body
    const tipo = "numero"

    const min = request[0]
    const max = request[1]


    const email = request[2]


    let sort = Math.floor(Math.random() * Math.floor(max) + 1)


    while (sort < min) {
        sort = Math.floor(Math.random() * Math.floor(max));
    }


    const idJson = await readLastId()
    if (idJson == false) {
        const id = 0

        sorteio(tipo, sort, id, email)
    } else {
        const id = idJson[0].id

        sorteio(tipo, sort, id, email)
    }



    res.setHeader("content-type", "application/json")
    res.sendStatus(200)
}

const readLastNumber = async (req, res) => {
    const readNum = await readLast()



    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(readNum))
}

const signup = async (req, res) => {
    const user = req.body



    const email = user[0]
    const nome = user[1]
    const senha = user[2]


    try {
        await create(email, nome, senha)

        res.json({
            message: "usuário criado com sucesso"
        })

    } catch (err) {
        res.json({
            message: `erro ao criar usuário - ${err}`
        })
    }
}

const login = async (req, res) => {
    res.setHeader("content-type", "application/json")

    const {
        email,
        senha
    } = req.body

    const user = await verification(email)

    if (user) {
        const match = await bcrypt.compare(senha, user.senha)

        if (!match) {
            res.json({
                erro: "senha incorreta"
            })
        }

        const token = jwt.sign({
            email
        }, 'secret', {
            expiresIn: 10 * 60
        })

        res.json({
            "auth": true,
            token,
            "email": email
        })

    } else {

        res.json({
            erro: "usuário não encontrado"
        })

    }
}


module.exports = {
    sorteioNum,
    readLastNumber,
    signup,
    login
}