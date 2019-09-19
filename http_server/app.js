
//modulo padrao http
var http = require('http');

//abrindo servidor
//funcao de callbak no parametro do createServer
http.createServer(function(req,res){
  //res é uma resposta para o usuário
  res.end("Hello World. welcome to my website!")
}).listen(8081);

console.log("O servidor está rodando!");
