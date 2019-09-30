const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Categoria")
const Categorias = mongoose.model("categorias")

router.get('/',(req,res) =>{
    //renderiza a view/admin/index
    res.render("admin/index")
})

router.get('/posts', (req,res) => {
    res.send("Página de posts")
})

router.get('/categorias',(req,res) => {
   // res.send("Página de categorias")
   res.render("admin/categorias")
})

router.post("/categorias/nova",(req,res) => {
    const novaCategoria = {
        //name dos input texts
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categorias(novaCategoria).save().then(() => {
        console.log("Categoria salva com sucesso")
    }).catch((err) => {
        console.log("Erro ao inserir categoria: "+err)
    })
})

router.get('/categorias/add',(req,res) => {
    res.render("admin/addcategorias")
})

module.exports = router