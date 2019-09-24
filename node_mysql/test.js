//open mysql on terminal and excute the command below
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
const Sequelize = require('sequelize')

//nome do banco, usuario e senha
const sequelize = new Sequelize('test','user','senha',{
  //servidor onde está o BD
  host: "localhost",
  //tipo de banco de dados
  dialect: 'mysql'
})

sequelize.authenticate().then(function(){
  console.log("Conectado com sucesso!")
}).catch(function(erro){
  console.log("Falha ao se conectar: "+erro)
})
