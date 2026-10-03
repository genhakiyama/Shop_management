const express = require('express');
const router = express.Router();

const adminController = require('../Controller/admin');

router.get('/add-product' , adminController.getAddProduct);
router.post('/product' , adminController.postProduct);

module.exports = router;