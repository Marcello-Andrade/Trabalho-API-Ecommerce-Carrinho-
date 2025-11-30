const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');

// usuário admin inicial (senha: 123456)
const adminPassword = bcrypt.hashSync('123456', 8);

const db = {
  users: [
    { id: uuid(), nomeCompleto: 'Admin Teste', email: 'admin@loja.test', passwordHash: adminPassword, role: 'admin' }
  ],
  categories: [],
  products: [],
  carts: []
};

module.exports = db;
