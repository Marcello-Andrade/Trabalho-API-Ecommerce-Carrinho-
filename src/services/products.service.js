const db = require('../models/db');
const { v4: uuid } = require('uuid');

exports.create = ({ nome, preco, descricao, categoriaId, estoque }) => {
  const cat = db.categories.find(c => c.id === categoriaId);
  if (!cat) throw { status: 400, message: 'Categoria inválida' };
  const id = uuid();
  const p = { id, nome, preco: Number(preco), descricao: descricao || '', categoriaId, estoque: Number(estoque) };
  db.products.push(p);
  return p;
};

exports.getAll = () => db.products;
exports.getById = (id) => db.products.find(p => p.id === id);
exports.update = (id, patch) => {
  const p = exports.getById(id);
  if (!p) throw { status: 404, message: 'Produto não encontrado' };
  Object.assign(p, patch);
  return p;
};
exports.remove = (id) => {
  const idx = db.products.findIndex(p => p.id === id);
  if (idx === -1) throw { status: 404, message: 'Produto não encontrado' };
  db.products.splice(idx, 1);
};

exports.adjustStock = (productId, delta) => {
  const p = exports.getById(productId);
  if (!p) throw { status: 404, message: 'Produto não encontrado' };
  if (p.estoque + delta < 0) throw { status: 409, message: 'Estoque insuficiente' };
  p.estoque += delta;
  return p;
};
