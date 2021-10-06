const { sorteio, readLast } = require('../models/index')


const sorteioNum = async (req, res) => {
    const request = req.body
    const tipo = "numero"

    const min = request[0]
    const max = request[1]

    let sort = Math.floor(Math.random() * Math.floor(max) + 1)


    while (sort < min) {
        sort = Math.floor(Math.random() * Math.floor(max));
    }


    sorteio(tipo, sort)

    res.setHeader("content-type", "application/json")
    res.sendStatus(200)
}

const readLastNumber = async (req, res) => {
    const readNum = await readLast()

    res.setHeader("content-type", "application/json")

    res.send(JSON.stringify(readNum))
}

module.exports = {
    sorteioNum, readLastNumber
}