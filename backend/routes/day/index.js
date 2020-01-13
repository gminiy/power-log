const express = require('express');
const router = express.Router();
const ctrl = require('./day-ctrl');

router.get('/', ctrl.list);
router.get('/:id', ctrl.read);
router.post('/', ctrl.register);
router.delete('/:id', ctrl.remove);

module.exports = router;