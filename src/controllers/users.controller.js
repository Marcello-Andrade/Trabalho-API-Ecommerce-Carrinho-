const usersService = require('../services/users.service');

exports.getAll = (req, res) => {
  const users = usersService.getAll();
  res.json(users.map(u => ({ id: u.id, nomeCompleto: u.nomeCompleto, email: u.email })));
};

exports.getById = (req, res, next) => {
  const u = usersService.getById(req.params.id);
  if (!u) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json({ id: u.id, nomeCompleto: u.nomeCompleto, email: u.email });
};

