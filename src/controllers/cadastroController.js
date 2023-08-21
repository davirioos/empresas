const Register = require("../models/cadastroModel");

exports.index = (req, res) => {
  res.render("cadastro");
};

exports.register = async function (req, res) {
  try {
    const login = new Register(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/registro/index");
      });
      return;
    }

    req.flash("success", "Seu Usuario Foi Criado com Sucesso");
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.loginindex = (req, res) => {
  res.render("login");
};

exports.login = async function (req, res) {
  try {
    const login = new Register(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", "Usuario não existe.");
      req.session.save(function () {
        return res.redirect("/");
      });
      return;
    }

    req.flash("success", "Você entrou no sistema.");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};  
