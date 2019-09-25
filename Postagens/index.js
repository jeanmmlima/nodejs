const express = require("express");
const app = express();
const utf8 = require('utf8');

//handlebars
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const Post = require('./models/Post')

//configurar handlebars como template engine

  //Tamplate engine
  app.engine('handlebars',handlebars({defaultLayout: 'main'}))
  app.set('view engine','handlebars')

  //body bodyParser (dados do form no express)

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())



//Rota

app.get('/cad',function(req,res){
  //nome do arquivo handle bars
  res.render('formulario')
})

app.get('/',function(req,res){
  //retorna todos os posts em tabela postagens
  //ordenar id, desc ou asc
  Post.findAll({order: [['id','DESC']]}).then(function(posts){
    //pagina, {dado para o front end}
    res.render('home',{posts: posts})
  })

})

// rota add recebe dados do form
// caso for passe os dados via POST: app.post
app.post('/add',function(req,res){
  //pegando os dados do form - req.body.dado do campo 'name' na tag html
  //res.send("Titulo: "+req.body.titulo+ " Conteudo:"+req.body.conteudo)

  //Gravando dados no banco
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  }).then(function(){
    //res.send("post criado com sucesso!")
    res.redirect('/')
  }).catch(function(erro){
    res.send("Houve um erro: "+erro)
  })
})




//deve ser a última linha do codigo.
//Nada do express funciona depois dessa lina
//localhost:8081
app.listen(8081, function(){
  console.log("Servidor rodando na url http://localhost:8081");
});
