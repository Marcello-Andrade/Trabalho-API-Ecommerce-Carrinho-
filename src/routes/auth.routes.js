const { Router } = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/register', [
  body('nomeCompleto').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], authController.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], authController.login);

module.exports = router;
