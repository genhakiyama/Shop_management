const express = require('express');
const router = express.Router();

const isAuth = require('../Middleware/Authen.js');

const cartController = require('../Controller/Cart');

router.get('/cart/add/:cartID' , isAuth , cartController.AddToCart);
router.get('/cart/remove/:cartID' , isAuth , cartController.RemoveCart);
router.get('/cart' , isAuth, cartController.cargoList);

module.exports = router; 