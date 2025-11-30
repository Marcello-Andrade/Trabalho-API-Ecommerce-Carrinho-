const { validationResult } = require('express-validator');
const productsService = require('../services/products.service');

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const p = productsService.create(req.body);
    res.status(201).json(p);
  } catch (err) { next(err); }
};

exports.getAll = (req, res) => res.json(productsService.getAll());

exports.getById = (req, res) => {
  const p = productsService.getById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(p);
};

exports.update = (req, res, next) => {
  try {
    const updated = productsService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = (req, res, next) => {
  try {
    productsService.remove(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
