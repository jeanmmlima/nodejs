//BD
const Sequelize = require('sequelize')

//conexao com BD mysql
//nome do banco, usuario e senha
const sequelize = new Sequelize('postapp','user','senha',{
  //servidor onde está o BD
  host: "localhost",
  //tipo de banco de dados
  dialect: 'mysql'
})

//exportanto os modules
module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
