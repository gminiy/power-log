const express = require('express');
const router = express.Router();
const ctrl = require('./set-ctrl');

router.post('/', ctrl.register);
router.delete('/:id', ctrl.remove);
router.put('/:id', ctrl.update);

module.exports = router;