const db = require('../models/db');
const { v4: uuid } = require('uuid');

exports.create = ({ nome, descricao }) => {
  const id = uuid();
  const cat = { id, nome, descricao: descricao || '' };
  db.categories.push(cat);
  return cat;
};

exports.getAll = () => db.categories;
exports.getById = (id) => db.categories.find(c => c.id === id);
exports.update = (id, patch) => {
  const c = exports.getById(id);
  if (!c) throw { status: 404, message: 'Categoria não encontrada' };
  Object.assign(c, patch);
  return c;
};
exports.remove = (id) => {
  const idx = db.categories.findIndex(c => c.id === id);
  if (idx === -1) throw { status: 404, message: 'Categoria não encontrada' };
  const hasProducts = db.products.some(p => p.categoriaId === id);
  if (hasProducts) throw { status: 409, message: 'Categoria possui produtos associados' };
  db.categories.splice(idx, 1);
};
