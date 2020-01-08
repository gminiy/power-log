const express = require('express');
const router = express.Router();
const ctrl = require('./set-ctrl');

router.get('/', ctrl.list);
router.post('/', ctrl.register);
router.delete('/:id', ctrl.remove);
router.put('/:id', ctrl.update);

module.exports = router;