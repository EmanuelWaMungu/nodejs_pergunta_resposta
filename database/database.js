const Sequelize = require("sequelize")
const connection = new Sequelize("guia_de_pergunta","root","",{
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection;