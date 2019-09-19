
//express é um modulo

const express = require("express");
const app = express();

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


//deve ser a última linha do codigo.
//Nada do express funciona depois dessa lina
//localhost:8081
//funcao de callback
app.listen(8081, function(){
  console.log("Servidor rodando na url http://localhost:8081");
});
