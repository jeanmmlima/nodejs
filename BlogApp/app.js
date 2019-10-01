//1. Loading Modules
const express = require('express')
const handlebars  = require('express-handlebars')
const bodyParsers = require('body-parser')
const app = express()
//require routes
const admin = require('./routes/admin')

//module path para trablhar com diretorios
const path = require("path")
const mongoose = require('mongoose')

const session = require("express-session")
const flash = require("connect-flash")

//2. Settings
    //2.0 Session
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true

    }))
    app.use(flash())

    //2.0.1 Middleware para trabalhar com sessoes
    app.use((req,res,next) => {
        //possível guardar variaveis globias
        //res.locals.nome = "Meu nome"
        //flash - sessao temporaria
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

    //2.1 Body Parsers
    app.use(bodyParsers.urlencoded({extended: true}))
    app.use(bodyParsers.json())

    //2.2 Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //2.3 Mongoose
    //coming soon...
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp").then(() => {
        console.log("Conectado ao mongo!")
    }).catch((err) => {
        console.log("Erro ao se conectar: "+err)
    })

    //2.4 Public files - arquivos estaticos em public
    app.use(express.static(path.join(__dirname,"public")))
    //app.use(express.static('public'))

    //MIDDLEWARE
    app.use((req,res,next) => {
        console.log("OLA EU SOU UM MIDDLEWARE")
        //passa a requisicao
        next()
    })

//3. Routes
    //Parâmetros: prefixo das rotas, constante definida
    app.use('/admin',admin)
    //grupo de rotas admin com prefixo admin => http://localhost:8081/admin/nomeDarota

    app.get('/',(req,res) => {
        res.send("Rota Principal")
    })

    app.get('/posts', (req,res) => {
        res.send("Lista de Posts")
    })



//4. Others
const PORT = 8081
app.listen(PORT,()=>{
    console.log("Server is running!")
})
