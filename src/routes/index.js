const { Router } = require('express');
const router = Router();

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./users.routes'));
router.use('/categories', require('./categories.routes'));
router.use('/products', require('./products.routes'));
router.use('/carts', require('./carts.routes'));

module.exports = router;
