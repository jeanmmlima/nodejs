//1. Loading Modules
const express = require('express')
const handlebars  = require('express-handlebars')
const bodyParsers = require('body-parser')
const app = express()
//require routes
const admin = require('./routes/admin')
//const mongoose = require('mongoose')

//2. Settings
    //2.1 Body Parsers
    app.use(bodyParsers.urlencoded({extended: true}))
    app.use(bodyParsers.json())

    //2.2 Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars');

    //2.3 Mongoose
    //coming soon...

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
