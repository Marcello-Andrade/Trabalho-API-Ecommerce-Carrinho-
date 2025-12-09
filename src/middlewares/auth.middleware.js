const jwt = require('jsonwebtoken');
const db = require('../models/db');
const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1) Falta o header Authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Token faltando' });
  }

  // 2) Formato precisa ser: Bearer token
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token faltando' });
  }

  const token = authHeader.split(' ')[1];

  // 3) Token vazio
  if (!token) {
    return res.status(401).json({ message: 'Token faltando' });
  }

  try {
    // 4) Verifica o token
    const payload = jwt.verify(token, JWT_SECRET);

    // 5) Valida se o user do token existe
    const user = db.users.find(u => u.id === payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'Usuário inválido' });
    }

    // 6) Disponibiliza o user para as próximas rotas
    req.user = user;

    return next();
  } catch (err) {
    // 7) Token malformado, expirado, etc.
    return res.status(401).json({ message: 'Token inválido' });
  }
};
