const {
    sorteio,
    readLast,
    readLastId
} = require('../models/index')

const {
    create,
    verification
} = require('../models/user')

const SMTP_CONFIG = require('../config/smtp')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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

    console.log(sort)

    const idJson = await readLastId()
    console.log(idJson)
    if (idJson == []) {
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
    const {
        email,
        nome,
        senha
    } = req.body




    try {
        await create(email, nome, senha)


        const transporter = nodemailer.createTransport({
            host: SMTP_CONFIG.host,
            port: SMTP_CONFIG.port,
            secure: false,
            auth: {
                user: SMTP_CONFIG.user,
                pass: SMTP_CONFIG.pass
            },
            tls: {
                rejectUnauthorized: false,
            }
        })

        const mailSent = await transporter.sendMail({
            text: `Obrigado, ${nome} por se cadastrar em nosso site`,
            subject: 'Confirmação de cadastro',
            from: SMTP_CONFIG.user,
            to: [String(email)]
        })
        console.log(mailSent)
        
    } catch (err) {
        throw new Error('Erro ao criar usuário: ' + err)
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
            throw new Error('Senha incorreta')
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

        throw new Error('Usuário não encontrado.')

    }
}

const image = async (req, res) => {
    const image = req.file
    console.log(image)

    res.status(200).send('Imagem recebida')
}

module.exports = {
    sorteioNum,
    readLastNumber,
    signup,
    login,
    image
}