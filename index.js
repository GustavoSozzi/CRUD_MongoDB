//configuracoes iniciais
require('dotenv').config() //pegando as variaveis do ambiente seguro dotenv
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//lendo JSON do express / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//rotas da API

const RoutesPessoas = require('./routes/PessoasRoutes') //usando as rotas

app.use('/pessoas', RoutesPessoas)

//rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({ message: 'testandooo'})  //a  resposta sera um JSON
})

const BDUSER = process.env.BDUSER
const BD_PASSWORD = process.env.BDPASSWORD

//entregar uma porta

mongoose.connect( "mongodb+srv://bomgustavo10:dPRFsr3TPlLQ4mGF@bancomongodb.czthnei.mongodb.net/BancoMongoDB?retryWrites=true&w=majority")
    .then(() => {
        console.log('conectado ao mongoDB')
        app.listen('3000')
    })
    .catch((err) => console.log(err))

app.listen(3333)



