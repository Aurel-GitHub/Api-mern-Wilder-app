const express = require('express');
const router = express.Router();

const wilderCtrl = require('../controllers/wilder');
const auth = require('../middleware/auth'); //rajout du middleware sur les routes à proteger

router.post('/wilder/', auth, wilderCtrl.createWilder);
router.put('/wilder/:_id', auth, wilderCtrl.modifyWilder);
router.delete('/wilder/:_id', auth, wilderCtrl.deleteWilder);
router.get('/wilder/:name', auth, wilderCtrl.getOneWilder);
router.get('/wilder/',  auth, wilderCtrl.getAllWilder);

  module.exports = router;  