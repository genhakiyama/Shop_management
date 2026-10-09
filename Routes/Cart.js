const express = require('express');
const router = express.Router();

const isOwner = require('../Middleware/is-owner.js');

const cartController = require('../Controller/Cart');

router.get('/add/:cartID' , cartController.AddToCart);
router.get('/remove/:cartID', cartController.RemoveCart);
router.get('/' , cartController.cargoList);

module.exports = router; 