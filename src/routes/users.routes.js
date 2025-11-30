const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', auth, usersController.getAll);
router.get('/:id', auth, usersController.getById);

module.exports = router;
