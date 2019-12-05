const express = require('express');
const router = express.Router();
const authRouter = require('./auth');

/* GET home page. */
router.use('/auth', authRouter);

module.exports = router;