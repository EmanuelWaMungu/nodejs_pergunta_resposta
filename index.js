const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")
const PerguntaController = require("./Controllers/Pergunta/index")
const RespostaController = require("./Controllers/Resposta/index")
const MainController = require("./Controllers/mainController/index")

connection.authenticate().then(()=>{
    console.log("Auntenticação feita com sucesso")
}).catch(()=>{
    console.log("Deu errado")
})
//Body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','ejs')
app.use(express.static("public"))

app.use("/",RespostaController)
app.use("/",PerguntaController)
app.use("/",MainController)

//Este codigo indica em qual porta o servidor vai trabalhar e o que sera exibido no console apos o carregamento com sucesso
app.listen(8080, () => {
    console.log("app rodando")
})