const express = require('express');
const router = express.Router();
const ctrl = require('./day-ctrl');

router.get('/latest', ctrl.getLatest);
router.delete('/:id', ctrl.delete);

module.exports = router;