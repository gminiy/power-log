const express = require('express');
const router = express.Router();
const ctrl = require('./exercise-ctrl');

router.get('/list/:exerciseId', ctrl.list);
router.get('/:id', ctrl.read);
router.post('/', ctrl.register);
router.delete('/:id', ctrl.remove);
router.put('/:id', ctrl.update);

module.exports = router;