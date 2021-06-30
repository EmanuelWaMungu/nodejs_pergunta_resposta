const express = require("express")
const router = express.Router()
const Pergunta = require("../../database/Pergunta")
const Resposta = require("../../database/Resposta")

router.post("/responder",(req,res)=>{
    let corpo = req.body.corpo
    let perguntaId = req.body.perguntaId 
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId)
    })
})
module.exports = router
