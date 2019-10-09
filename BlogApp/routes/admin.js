const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Categoria")
const Categorias = mongoose.model("categorias")
require("../models/Postagens")
const Postagens = mongoose.model("postagens")

//verifica se usuario autenticado é Admin. 
//as rotas que eu quiser proteger, passo e eAdmin como parâmetro
const {eAdmin} = require("../helpers/eAdmin")


router.get('/', eAdmin, (req,res) =>{
    //renderiza a view/admin/index
    res.render("admin/index")
})

router.get('/posts', eAdmin, (req,res) => {
    res.send("Página de posts")
})

router.get('/categorias', eAdmin, (req,res) => {
   // res.send("Página de categorias")
   Categorias.find().sort({date: 'desc'}).then((categorias) => {
       res.render("admin/categorias",{categorias: categorias})
   }).catch((err) => {
       req.flash("error_msg", "Houve erro ao listar as caterorias")
       res.redirect("/admin")
   })
})

router.post("/categorias/nova", eAdmin, (req,res) => {

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
router.get("/categorias/edit/:id", eAdmin,(req,res) => {
    Categorias.findOne({_id: req.params.id}).then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
    //res.send("Página de edição de categoria!")
    
})

router.post("/categorias/edit", eAdmin, (req,res) => {
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

router.post("/categorias/deletar", eAdmin, (req,res) =>{
    Categorias.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve erro ao deletar categoria")
        res.redirect("/admin/categorias")
    })

})

router.get('/categorias/add',(req,res) => {
    res.render("admin/addcategorias")
})


router.get("/postagens", eAdmin,(req,res) => {
    //categoria -> nome do campo na view de postagens
    Postagens.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("admin/postagens", {postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Houve erro ao listar as postagens")
        res.redirect("/admin")
    })
    
})

router.get("/postagens/edit/:id", eAdmin,(req,res) => {
    Postagens.findOne({_id: req.params.id}).then((postagem) => {
        Categorias.find().then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem})
        }).catch((err) => {
            req.flash("error_msg", "Não conseguiu listar categorias")
            res.redirect("/admin/postagens")
        })
        
    }).catch((err) => {
        req.flash("error_msg", "Esta postagem não existe")
        res.redirect("/admin/postagens")
    })
    
})

router.post("/postagens/edit/", eAdmin, (req,res) => {

     Postagens.findOne({_id: req.body.id}).then((postagem) => {

        postagem.titulo = req.body.titulo
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.slug = req.body.slug
        postagem.categoria = req.body.categoria

        postagem.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve erro interno ao salvar a edição da postagem")
            res.redirect("/admin/postagens")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve erro ao editar postagem")
        res.redirect("/admin/postagens")
    })

})

router.get("/postagens/deletar/:id", eAdmin, (req,res) => {
    Postagens.remove({_id: req.params.id}).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso!")
        res.redirect("/admin/postagens")
    }).catch((err) => {
        req.flash("error_msg", "Houve erro ao deletar postagem")
        res.redirect("/admin/postagens")
    })
})

router.get("/postagens/add", eAdmin, (req,res) => {
    //categorias enviadas para view
    Categorias.find().then((categorias) => {
        res.render("admin/addpostagens", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve erro carregar postagens")
        res.redirect("/admin")
    })
    
})

router.post("/postagens/nova", eAdmin, (req,res) => {

    var erros = []
    if(req.body.categoria == "0"){
        erros.push({texto: "Categoria inválida, registre uma categoria primeiro!"})
    }
    if(erros.length > 0){
        res.render("admin/addpostagens",{erros: erros})
    } else {
        const novaPostagem = {
            //name dos input texts
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }
        new Postagens(novaPostagem).save().then(() => {
            //console.log("Categoria salva com sucesso")
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve erro ao salvar a postagem. Tente novamente!")
            //console.log("Erro ao inserir dado: "+err)
           res.redirect("/admin/postagens")
        })
    }

    

})

module.exports = router