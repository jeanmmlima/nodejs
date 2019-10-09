const estrategiaLocal = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//model usuario
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function(passport){
    passport.use(new estrategiaLocal({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {

        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                //done recebe 3 parametros - null conta null, false - autenticacao sem sucesso
                return done(null, false,{message: "Está conta não existe!"})
            }
            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuario)
                } else {
                    return done(null, false, {message: "Senha inválida!"})
                }
            })
        })

    }))

    //dados na sessao
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id,(err,usuario) => {
            done(err,usuario)
        })
    })
}