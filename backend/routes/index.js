const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const exerciseRouter = require('./exercise');
const setRouter = require('./set');
const dayRouter = require('./day');
const { isLoggedIn } = require('../middlewares/auth-middlewares');

router.use('/auth', authRouter);
router.use('/exercise', isLoggedIn, exerciseRouter);
router.use('/set', isLoggedIn, setRouter);
router.use('/day', isLoggedIn, dayRouter);

module.exports = router;