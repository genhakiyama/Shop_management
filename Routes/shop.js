const express = require('express');
const router = express.Router();

const shopController = require('../Controller/shop');

router.get('/products/:productID' , shopController.ProductDetails);

router.get('/products' , shopController.showProduct);

module.exports = router;