const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: String, required: false, default: "" },
  custo: { type: String, required: false, default: "" },
  validade: { type: Date, required: false, default: "" },
  criadoEm: { type: Date, default: Date.now },
});

const ProdutoModel = mongoose.model('Produto', ProdutoSchema);

function Produto(body){
  this.body = body;
  this.errors = [];
  this.produto = null
}

Produto.buscaPorId = async function(id){
  if(typeof id !== 'string') return;
  const user = await ProdutoModel.findById(id);
  return user;
}

Produto.prototype.register = async function(){
  this.valida();

  if(this.errors.length > 0)return;
  this.produto = await ProdutoModel.create(this.body);
}

Produto.prototype.valida = function () {
  this.cleanUp();

  if (!this.body.quantidade && !this.body.custo) {
    this.errors.push(
      "Pelo menos um dado precisa ser enviado: quantidade ou custo."
    );
  }
};

Produto.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    nome: this.body.nome,
    quantidade: this.body.quantidade,
    custo: this.body.custo,
    validade: this.body.validade,
  };
};

Produto.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0 )return;
  this.produto = await ProdutoModel.findByIdAndUpdate(id, this.body, {new: true});
};

Produto.buscaProduto = async function () {
  const produtos = await ProdutoModel.find()
    .sort({ criadoEm: -1 });
  return produtos;
};

Produto.delete = async function (id) {
  if (typeof id !== "string") return;
  const produto = await ProdutoModel.findOneAndDelete({_id: id});
  return produto;
};

module.exports = Produto;