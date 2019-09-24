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

//Model - Tabela
//nome da tabela, {campos...}

const Postagem = sequelize.define('postagens',{
  titulo:{
    //varchar
    type: Sequelize.STRING
  },
  conteudo:{
    //campo texto
    type: Sequelize.TEXT
  }
})

//Sincroniza o Model com o mysql - executa o model, no caso cria a tabela
//Postagem.sync({force: true})
//Postagem.create({
//  titulo: "TITULO TESTE",
//  conteudo: "blablqablablablalbalbalbalbalbalbalbalb"
//})


const Usuario = sequelize.define('usuarios',{
  nome:{
    type: Sequelize.STRING
  },
  sobrenome:{
    type: Sequelize.STRING
  },
  idade: {
    type: Sequelize.INTEGER
  },
  email:{
    type: Sequelize.STRING
  }
})

//Usuario.sync({force: true})

Usuario.create({
  nome: "Jean",
  sobrenome: "Lima",
  idade: 26,
  email: "jean@mail.com"
})
