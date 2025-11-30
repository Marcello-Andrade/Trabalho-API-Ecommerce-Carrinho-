const { validationResult } = require('express-validator');
const cartsService = require('../services/carts.service');

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const cart = cartsService.create({ nomeCliente: req.body.nomeCliente });
    res.status(201).json(cart);
  } catch (err) { next(err); }
};

exports.getAll = (req, res) => res.json(cartsService.getAll());

exports.getById = (req, res) => {
  const c = cartsService.getById(req.params.id);
  if (!c) return res.status(404).json({ message: 'Carrinho não encontrado' });
  res.json(c);
};

exports.addItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { productId, quantidade } = req.body;
  try {
    const updated = cartsService.addItem(req.params.id, { productId, quantidade });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.removeItem = (req, res, next) => {
  try {
    cartsService.removeItem(req.params.id, req.params.itemId);
    res.status(204).send();
  } catch (err) { next(err); }
};

exports.confirmCart = (req, res, next) => {
  try {
    const result = cartsService.confirmCart(req.params.id);
    res.json(result);
  } catch (err) { next(err); }
};
