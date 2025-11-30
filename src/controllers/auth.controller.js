const { validationResult } = require('express-validator');
const usersService = require('../services/users.service');

exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { nomeCompleto, email, password } = req.body;
  try {
    const user = usersService.createUser({ nomeCompleto, email, password });
    res.status(201).json({ id: user.id, email: user.email, nomeCompleto: user.nomeCompleto });
  } catch (err) { next(err); }
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  try {
    const token = usersService.authenticate({ email, password });
    res.json({ token });
  } catch (err) { next(err); }
};
