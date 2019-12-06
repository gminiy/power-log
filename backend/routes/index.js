const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const exerciseRouter = require('./exercise');
const recordRouter = require('./record');
const { isLoggedIn } = require('../middlewares/authMiddlewares');

router.use('/auth', authRouter);
router.use('/exercise', isLoggedIn, exerciseRouter);
router.use('/record', isLoggedIn, recordRouter);

module.exports = router;