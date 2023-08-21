const { async } = require('regenerator-runtime');
const Produto = require('../models/ProdutocadastroModel');
const { ADDRGETNETWORKPARAMS } = require('dns');

exports.index = (req, res) => {
  res.render("produtos");
};
exports.produto = (req, res) => {
  res.render("cadastraprodutos",{
    produto:{},
  });
};

exports.register = async (req, res) =>{

  try{
    const produto = new Produto(req.body);
    await produto.register();
    if (produto.errors.length > 0) {
      req.flash("errors", produto.errors);
      req.session.save(() => res.redirect("/cadastro/produtos"));
      return;
    }

    req.flash("success", "Produto Registrado com sucesso");
    req.session.save(() => res.redirect(`/cadastro/produtos/${produto.produto._id}`));
    return;

  }catch(e){
    console.log(e);
    return res.render('404');
  }
};

exports.editIndex = async function(req, res){
  if(!req.params.id) return res.render('404')

  const produto = await Produto.buscaPorId(req.params.id);
  if (!produto) return res.render("404");

  res.render("cadastraprodutos",{ produto });
}

exports.edit = async function(req, res){
  try{

    if (!req.params.id) return res.render("404");
    const produto = new Produto(req.body);
    await produto.edit(req.params.id);

    if (produto.errors.length > 0) {
      req.flash("errors", produto.errors);
      req.session.save(() => res.redirect("/cadastro/produtos"));
      return;
    }

    req.flash("success", "Produto Editado com sucesso");
    req.session.save(() =>
      res.redirect(`/cadastro/produtos/${produto.produto._id}`)
    );
    return;

  }catch(e){
    console.log(e);
    return res.render('404');
  }
};

exports.visualizar = async (req, res) => {
  const produtos = await Produto.buscaProduto();
  res.render("visualizaproduto",{ produtos });
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const produto = await Produto.delete(req.params.id);
  if (!produto) return res.render("404");

  req.flash("success", "Produto Apagado com sucesso");
  req.session.save(() => res.redirect(`/produtos/tabela`));
  return;
};