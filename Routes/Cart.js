const express = require('express');
const router = express.Router();

const cartController = require('../Controller/Cart');

router.get('/cart/add/:cartID' , cartController.AddToCart);
router.get('/cart' , cartController.cargoList);

module.exports = router; 