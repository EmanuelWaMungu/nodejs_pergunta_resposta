const express = require("express")
const router = express.Router()
const Pergunta = require("../../database/Pergunta")
const Resposta = require("../../database/Resposta")


router.get('/', (req, res) => {
    Pergunta.findAll({raw: true,order:[
        ['id','DESC']
    ]}).then(pergunta=>{
        res.render("index",{
            perguntas: pergunta
        })
    })


})

module.exports = router