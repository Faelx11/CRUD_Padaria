const express = require('express')
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')

const app = express()

app.engine('handlebars', handlebars({defaultLayout: 'main'}))

app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

const produtos = require('./models/produtos')


app.get('/', function(req, res){
    res.render('cadastro')
})

app.post('/cadastrar', function(req, res){
    produtos.create({  
        nome: req.body.nome,
        preco: req.body.preco, 
        quantidade: req.body.quantidade
       
    })
    .then(function(){
        res.redirect('/consulta')
    })
    .catch(function(erro){
        console.log("Erro ao cadastrar: " + erro)
    })
})

app.get('/consulta', function(req, res){
    produtos.findAll() 
    .then(function(produtos){
        res.render('consulta', {produtos}) 
    })
    .catch(function(erro){
        console.log("Erro ao consultar: " + erro)
    })
})

app.get('/editar/:id', function(req, res){
    produtos.findAll(
        {
            where: {
                'id': req.params.id
            }
        })
        .then(function(produtos){ 
            res.render('editar', {produtos}) 
        })
        .catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.post('/atualizar', function(req, res){
    produtos.update({  
        nome: req.body.nome,
        preco: req.body.preco,  
        quantidade: req.body.quantidade
    },
    {
        where: {
            id: req.body.id
        }
    })
    .then(function(){
        res.redirect('/consulta')
    })
})

app.get('/excluir/:id', function(req, res){
    produtos.destroy(  
        {
            where: {
                'id': req.params.id
            }
        }
    )
    .then(function(){
        res.render('cadastro')
    })
    .catch(function(erro){
        console.log("Erro ao excluir: " + erro)
    })
})

app.listen(8081, function(){
    console.log("Servidor iniciado")
})