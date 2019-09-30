const express = require("express")
const router = express.Router()

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

router.get('/categorias/add',(req,res) => {
    res.render("admin/addcategorias")
})

module.exports = router