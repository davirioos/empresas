const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const cadastroController = require('./src/controllers/cadastroController');
const produtosController = require("./src/controllers/produtosController");
const { loginRequired } = require("./src/middlewares/middleware");


// Rotas da home
route.get('/', homeController.paginaInicial);

// Rotas de login
route.get("/login/index", cadastroController.loginindex);
route.post("/login/login", cadastroController.login);
route.get("/login/logout", cadastroController.logout);

// Rotas de Cadastro
route.get("/registro/index", cadastroController.index);
route.post("/cadastro/registro", cadastroController.register);

//Rotas de Produtos
route.get("/produtos/index", loginRequired, produtosController.index);
route.get("/cadastro/produtos", loginRequired, produtosController.produto);
route.post("/cadastros/register/", loginRequired, produtosController.register);
route.get("/cadastro/produtos/:id", loginRequired, produtosController.editIndex);
route.post("/cadastros/edit/:id", loginRequired, produtosController.edit);

//Rotas de Visualiza Produtos

route.get("/produtos/tabela", loginRequired, produtosController.visualizar);
route.get("/cadastros/delete/:id", loginRequired, produtosController.delete);


module.exports = route;


///contato/edit/
