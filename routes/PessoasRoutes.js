
const router = require('express').Router()

const Person = require('../models/Pessoas')

//Criacao de dados
router.post('/', async (req, res) => {

    //req.body
    const {name, salary, aprooved} = req.body

    const person = {
        name, 
        salary, 
        aprooved
    }

    if(!name){
        res.status(422).json({error: 'o nome e obrigatorio'})
    }
    if(!salary){
        res.status(422).json({error: 'o salario e obrigatorio'})
    }

    try{
        //criando dados
        await Person.create()

        res.status(201).json({message: 'pessoa inserida com sucesso'}) //requisicao bem sucedida, novo recurso criado

    }catch(error){
        res.status(500).json({error: error})
    }
})

//READ - leitura de dados
router.get('/', async(req, res) => {
    try{
        const pessoa = await Person.find() //todos dados da colection sejam retornados

        res.status(200).json(pessoa) //enviando requisicao de sucesso
    }
    catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    //extrair o dado da requisicao, pela url = req.params

    const id = req.params.id

    try{

        const pessoa = await Person.findOne({ _id: id}) //filtrando apenas um

        //usuario nao encontrado

        if(!person){
            res.status(422).json({message: 'usuario nao encontrado'})
            return
        }

        res.status(200).json(pessoa)

    }catch(error){
        res.status(500).json({error: error})
    }
})


//Update - atualizacao de dados(PUT, PATCH)
router.patch('/:id', async(req, res) => {

    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try{
        const updatePerson = await Person.updateOne({_id: id}, person) //atualizacao do banco de dados

        if(updatePerson.matchedCount === 0){ //quantos documenmtos foram encontrados
            res.status(422).json({message: 'o usuario nao foi encontrado'})
            return
        }

        res.status(200).json(pérson)
    }
    catch(error){
        res.status(500).json({error: error})
    }
})


//Delete - deletar dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const pessoa = await Person.findOne({ _id: id}) //filtrando apenas um

    //usuario nao encontrado

    if(!pessoa){
        res.status(422).json({message: 'usuario nao encontrado'})
        return
    }   

    try{

        await Person.deleteOne({_id: id}) //Buscando e deletando pelo ID

        res.status(200).json({message: 'usario deletado!!'})

    }catch(error){
        res.status(500).json({error: error})
    }

})

module.exports = router