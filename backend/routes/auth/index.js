const express = require('express');
const router = express.Router();
const ctrl = require('./auth-ctrl');

router.post('/login', ctrl.login);
router.get('/check', ctrl.checkToken);

module.exports = router;