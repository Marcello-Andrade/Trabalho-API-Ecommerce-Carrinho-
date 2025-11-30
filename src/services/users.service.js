const db = require('../models/db');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET';

exports.createUser = ({ nomeCompleto, email, password }) => {
  const exists = db.users.find(u => u.email === email);
  if (exists) throw { status: 409, message: 'Email já cadastrado' };
  const id = uuid();
  const passwordHash = bcrypt.hashSync(password, 8);
  const user = { id, nomeCompleto, email, passwordHash, role: 'user' };
  db.users.push(user);
  return user;
};

exports.authenticate = ({ email, password }) => {
  const user = db.users.find(u => u.email === email);
  if (!user) throw { status: 401, message: 'Credenciais inválidas' };
  if (!bcrypt.compareSync(password, user.passwordHash)) throw { status: 401, message: 'Credenciais inválidas' };
  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  return token;
};

exports.getAll = () => db.users;
exports.getById = (id) => db.users.find(u => u.id === id);
