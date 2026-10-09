const express = require('express');
const router = express.Router();

const isAuth = require('../Middleware/Authen.js');

const adminController = require('../Controller/admin');

router.get('/add-product' , isAuth , adminController.getAddProduct);
router.post('/product' , isAuth , adminController.postProduct);

router.get('/product/edit-product/:productID', isAuth , adminController.EditProduct);
router.post('/product/delete-product/:productID' , isAuth , adminController.RemoveProduct);

module.exports = router;