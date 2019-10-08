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

require("./models/Postagens")
const Postagem = mongoose.model("postagens")

require("./models/Categoria")
const Categoria = mongoose.model("categorias")

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
        Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) =>{
            res.render("index", {postagens: postagens})
        }).catch((err) => {
            req.flash("error_msg", "Houve erro interno!")
            res.redirect("/404")
        })

    })

    app.get("/postagem/:slug",(req,res) => {
        Postagem.findOne({slug: req.params.slug}).then((postagem) => {
            if(postagem){
                res.render("postagem/index", {postagem: postagem})
            } else {
                req.flash("error_msg", "Está postagem não existe!")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/404", (req,res) => {
        res.send('Erro 404!')
    })

    app.get('/posts', (req,res) => {
        res.send("Lista de Posts")
    })

    app.get("/categorias", (req,res) => {
        Categoria.find().then((categorias) => {
            res.render("categorias/index", {categorias: categorias})
        }).catch((err) => {
            req.flash("error_msg", "Houve erro interno ao listar categorias!")
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug", (req,res) => {
        Categoria.findOne({slug: req.params.slug}).then((categoria) => {
            if(categoria){
                Postagem.find({categoria: categoria._id}).then((postagens) => {
                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                }).catch((err) => {
                    req.flash("error_msg", "Houve erro ao listar posts")
                    res.redirect("/")
                })
            } else {
                req.flash("error_msg", "Categoria não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve erro interno ao carregar categoria!")
            res.redirect("/")
        })
    })


//4. Others
const PORT = 8081
app.listen(PORT,()=>{
    console.log("Server is running!")
})
