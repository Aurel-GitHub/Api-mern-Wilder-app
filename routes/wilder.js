const express = require('express');
const router = express.Router();

const wilderCtrl = require('../controllers/wilder');
const auth = require('../middleware/auth'); //rajout du middleware sur les routes à proteger

router.post('/', auth, wilderCtrl.createWilder);
router.put('/:_id', auth, wilderCtrl.modifyWilder);
router.delete('/:_id', auth, wilderCtrl.deleteWilder);
router.get('/:name', auth, wilderCtrl.getOneWilder);
router.get('/',  auth, wilderCtrl.getAllWilder);

  module.exports = router;  