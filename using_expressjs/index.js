
//express é um framework orientado a rotas

const express = require("express");
const app = express();
const utf8 = require('utf8');


//criando rotas
app.get("/",function(req,res){
  res.send("Seja bem-vindo ao meu app");
});

app.get("/sobre",function(req,res){
  res.send("Minha página sobre!");
});

app.get("/blog",function(req,res){
  res.send("bem-vindo ao meu blog");
});

//PARAMETROS

//atraves do objecto REQ  consigo obter os parametros da requisicao
//A função send só pode ser chamada uma vez dentro de uma rota.
app.get("/ola/:cargo/:nome/:titulo", function(req,res){
  res.send("<h1>Olá "+req.params.nome+"</h1>" +
  "<h2>Seu cargo é: "+req.params.cargo+"</h2>" +
  "<h3>Seu título é: "+req.params.titulo+"</h3>");
//  res.send("<h2> Seu cargo e: "+req.params.cargo+"</h2>");
//  res.send("<h3> Seu título e:"+req.params.cargo+"</h3>");
});

//deve ser a última linha do codigo.
//Nada do express funciona depois dessa lina
//localhost:8081
//funcao de callback
app.listen(8081, function(){
  console.log("Servidor rodando na url http://localhost:8081");
});
