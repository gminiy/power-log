const express = require('express');
const router = express.Router();
const ctrl = require('./set-ctrl');

router.get('/', ctrl.read);
router.post('/', ctrl.register);
router.post('/withDate', ctrl.registerWithDate);
router.delete('/:id', ctrl.delete);
router.delete('/day/:id', ctrl.deleteDay);
router.put('/:id', ctrl.update);
router.get('/list', ctrl.list);
router.get('/list/period', ctrl.listWithPeriod);

module.exports = router;