const express = require('express');
const router = express.Router();
const ctrl = require('./set-ctrl');

router.get('/:id', ctrl.read);
router.post('/', ctrl.register);
router.delete('/:id', ctrl.remove);
router.put('/:id', ctrl.update);

module.exports = router;