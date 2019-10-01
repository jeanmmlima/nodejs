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
   Categorias.find().sort({date: 'desc'}).then((categorias) => {
       res.render("admin/categorias",{categorias: categorias})
   }).catch((err) => {
       req.flash("error_msg", "Houve erro ao listar as caterorias")
       res.redirect("/admin")
   })
})

router.post("/categorias/nova",(req,res) => {

    //validacao
    var erros = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido!"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido!"})
    }
    if(req.body.nome.length < 2){
        erros.push({texto: "Nome da categoria é muito pequeno"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias",{erros: erros})
    } else {

        const novaCategoria = {
            //name dos input texts
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categorias(novaCategoria).save().then(() => {
            //console.log("Categoria salva com sucesso")
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve erro ao salvar a categoria. Tente novamente!")
           // console.log("Erro ao inserir categoria: "+err)
           res.redirect("/admin")
        })
    }

})

//:id parametro de quem será editado
router.get("/categorias/edit/:id",(req,res) => {
    Categorias.findOne({_id: req.params.id}).then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
    //res.send("Página de edição de categoria!")
    
})

router.post("/categorias/edit", (req,res) => {
    Categorias.findOne({_id: req.body.id}).then((categoria) => {

        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve erro interno ao salvar a edição da categoria")
            res.redirect("/admin/categorias")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve erro ao editar categoria")
        res.redirect("/admin/categorias")
    })
})

router.get('/categorias/add',(req,res) => {
    res.render("admin/addcategorias")
})

module.exports = router