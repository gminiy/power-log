const express = require('express');
const router = express.Router();
const ctrl = require('./auth-ctrl');

router.get('/register', ctrl.register);
router.get('/login', ctrl.login);
router.get('/logout', ctrl.logout);

module.exports = router;