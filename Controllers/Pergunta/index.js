const express = require("express")
const router = express.Router()
const Pergunta = require("../../database/Pergunta")
const Resposta = require("../../database/Resposta")


router.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})


router.post('/salvarpergunta',(req,res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao
    Pergunta.create(
        {
            titulo: titulo,
            descricao: descricao
        }
    ).then(()=>{  res.redirect("/")  })
})


router.get("/pergunta/:id",(req,res)=>{
    let id = req.params.id
    Pergunta.findOne({raw:true, where:{id:id}}).then((pergunta)=>{
       if(pergunta != undefined){

       Resposta.findAll({where:{perguntaId: pergunta.id},order:[
           ['id','DESC']
       ]}).then(respostas => {
        
        res.render("pergunta",{
                pergunta: pergunta,
                respostas: respostas
            })
       })

        
       }else{
        res.redirect("/")
       }
    })
})
module.exports = router
