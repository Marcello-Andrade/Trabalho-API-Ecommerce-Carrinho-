const db = require('../models/db');
const { v4: uuid } = require('uuid');
const productsService = require('./products.service');

exports.create = ({ nomeCliente }) => {
  const id = uuid();
  const cart = { id, nomeCliente, dataHora: new Date().toISOString(), items: [], confirmed: false };
  db.carts.push(cart);
  return cart;
};

exports.getAll = () => db.carts;
exports.getById = (id) => db.carts.find(c => c.id === id);

exports.addItem = (cartId, { productId, quantidade }) => {
  const cart = exports.getById(cartId);
  if (!cart) throw { status: 404, message: 'Carrinho não encontrado' };
  if (cart.confirmed) throw { status: 409, message: 'Carrinho já confirmado' };
  const product = productsService.getById(productId);
  if (!product) throw { status: 404, message: 'Produto não encontrado' };
  if (product.estoque < quantidade) throw { status: 409, message: 'Estoque insuficiente para adicionar ao carrinho' };
  const existing = cart.items.find(i => i.productId === productId);
  if (existing) {
    if (product.estoque < existing.quantidade + quantidade) throw { status: 409, message: 'Estoque insuficiente' };
    existing.quantidade += Number(quantidade);
  } else {
    cart.items.push({ id: uuid(), productId, quantidade: Number(quantidade) });
  }
  return cart;
};

exports.removeItem = (cartId, itemId) => {
  const cart = exports.getById(cartId);
  if (!cart) throw { status: 404, message: 'Carrinho não encontrado' };
  const idx = cart.items.findIndex(i => i.id === itemId);
  if (idx === -1) throw { status: 404, message: 'Item não encontrado' };
  cart.items.splice(idx, 1);
};

exports.confirmCart = (cartId) => {
  const cart = exports.getById(cartId);
  if (!cart) throw { status: 404, message: 'Carrinho não encontrado' };
  if (cart.confirmed) throw { status: 409, message: 'Carrinho já confirmado' };
  cart.items.forEach(item => {
    const p = productsService.getById(item.productId);
    if (!p) throw { status: 404, message: `Produto ${item.productId} não encontrado` };
    if (p.estoque < item.quantidade) throw { status: 409, message: 'Estoque insuficiente ao confirmar' };
  });
  cart.items.forEach(item => productsService.adjustStock(item.productId, -item.quantidade));
  cart.confirmed = true;
  cart.confirmedAt = new Date().toISOString();
  return cart;
};
