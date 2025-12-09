const { Router } = require('express');
const router = Router();

// Rotas públicas
router.use('/auth', require('./auth.routes'));

// Rotas protegidas
router.use('/users', require('./users.routes'));
router.use('/categories', require('./categories.routes'));
router.use('/products', require('./products.routes'));
router.use('/carts', require('./carts.routes'));

module.exports = router;
