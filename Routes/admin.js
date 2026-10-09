const express = require('express');
const router = express.Router();

const isOwner = require('../Middleware/Is-owner.js');

const adminController = require('../Controller/admin');

router.get('/add-product' , adminController.getAddProduct);
router.post('/product' , adminController.postProduct);

router.get('/product/edit-product/:productID', adminController.EditProduct);
router.post('/product/delete-product/:productID' ,  adminController.RemoveProduct);

module.exports = router;