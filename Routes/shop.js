const express = require('express');
const router = express.Router();

const shopController = require('../Controller/shop');
router.get('/products' , shopController.showProduct);

router.get('/products/:productID' , shopController.ProductDetails);

module.exports = router;