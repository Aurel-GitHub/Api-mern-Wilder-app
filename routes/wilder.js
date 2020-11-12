const express = require('express');
const router = express.Router();

const wilderCtrl = require('../controllers/wilder');

router.post('/', wilderCtrl.createWilder);
router.put('/:_id', wilderCtrl.modifyWilder);
router.delete('/:_id', wilderCtrl.deleteWilder);
router.get('/:name', wilderCtrl.getOneWilder);
router.get('/', wilderCtrl.getAllWilder);

  module.exports = router;  