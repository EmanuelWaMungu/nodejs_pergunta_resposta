const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

connection.authenticate().then(()=>{
    console.log("Auntenticação feita com sucesso")
}).catch(()=>{
    console.log("Deu errado")
})
//Body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Routas

//Este codigo seta que a view engine que vamos usar eh o ejs
app.set('view engine','ejs')
//Este codigo diz para usar a pasta public para carregar arquivos estativos
app.use(express.static("public"))

//Parte do codigo que retorna a pagina principal
app.get('/', (req, res) => {
    Pergunta.findAll({raw: true,order:[
        ['id','DESC']
    ]}).then(pergunta=>{
        res.render("index",{
            perguntas: pergunta
        })
    })


})

//Este codigo retorna a pagina perguntar
app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})




//Parte que retorna uma pergunta
app.get("/pergunta/:id",(req,res)=>{
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

//Responder Pergunta
app.post("/responder",(req,res)=>{
    let corpo = req.body.corpo
    let perguntaId = req.body.perguntaId 
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId)
    })
})
//Parte que salva uma determinada pergunta 
app.post('/salvarpergunta',(req,res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao
    Pergunta.create(
        {
            titulo: titulo,
            descricao: descricao
        }
    ).then(()=>{  res.redirect("/")  })
})

//Este codigo indica em qual porta o servidor vai trabalhar e o que sera exibido no console apos o carregamento com sucesso
app.listen(8080, () => {
    console.log("app rodando")
})