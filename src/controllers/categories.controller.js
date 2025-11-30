const { validationResult } = require('express-validator');
const categoriesService = require('../services/categories.service');

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const cat = categoriesService.create(req.body);
    res.status(201).json(cat);
  } catch (err) { next(err); }
};

exports.getAll = (req, res) => res.json(categoriesService.getAll());

exports.getById = (req, res) => {
  const c = categoriesService.getById(req.params.id);
  if (!c) return res.status(404).json({ message: 'Categoria não encontrada' });
  res.json(c);
};

exports.update = (req, res, next) => {
  try {
    const updated = categoriesService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = (req, res, next) => {
  try {
    categoriesService.remove(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
