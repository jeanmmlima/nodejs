const mongoose = require("mongoose")

//mongo conecta em forma de url servidor/bancoDedados

//arrow function para nao ter que toda vez declarar uma função function(){}

//() => {} é igual a function(){}

//Configurando Mangoose
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost/bdteste", {
    //eliminou warnings
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Conectado com sucesso!")
  }).catch((err) =>{
    console.log("Houve um erro ao conectar ao mangodb: "+err)
  })

//Definindo model - Usuarios

//Schema no final do nome do model
const UsuarioSchema = mongoose.Schema({

  nome: {
    //trabalha com os dados nativos do javascrip -> string, number, date, object
    type: String,
    //obrigatorio ou não
    require: true
  },
  sobrenome: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true

  },
  idade: {
    //qualquer tipo de numero - number, qualqeur texto -> string
    type: Number,
    require: true
  },
  pais: {
    type: String,
  }
})

//COLLECTION
//parâmetros:
//(nome da collection (conjunto de dados similar a tabela do SQL),
//model)
mongoose.model('usuarios', UsuarioSchema)

// criando novo usario - inserindo usuarios
const Usuario = mongoose.model('usuarios')

new Usuario({
  nome: "Joao",
  sobrenome: "Maria",
  email: "joao@test.br",
  idade: 20,
  pais: "Brasil"
}).save().then(()=>{
  console.log("Usuario criado com sucesso!")
}).catch((err) => {
  console.log("Houve erro ao criar usuario: "+err);
})
