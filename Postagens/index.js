const express = require("express");
const app = express();
const utf8 = require('utf8');
//BD
const Sequelize = require('sequelize')
//handlebars
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

//configurar handlebars como template engine

  //Tamplate engine
  app.engine('handlebars',handlebars({defaultLayout: 'main'}))
  app.set('view engine','handlebars')

  //body bodyParser (dados do form no express)

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  //conexao com BD mysql
  //nome do banco, usuario e senha
  const sequelize = new Sequelize('test','user','senha',{
    //servidor onde está o BD
    host: "localhost",
    //tipo de banco de dados
    dialect: 'mysql'
  })

//Rota

app.get('/cad',function(req,res){
  //nome do arquivo handle bars
  res.render('formulario')
})

// rota add recebe dados do form
// caso for passe os dados via POST: app.post
app.post('/add',function(req,res){
  //pegando os dados do form - req.body.dado do campo 'name' na tag html
  res.send("Titulo: "+req.body.titulo+ " Conteudo:"+req.body.conteudo)
})




//deve ser a última linha do codigo.
//Nada do express funciona depois dessa lina
//localhost:8081
app.listen(8081, function(){
  console.log("Servidor rodando na url http://localhost:8081");
});
