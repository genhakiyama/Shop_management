const express = require('express');
const router = express.Router();

const { productInput , accessProduct } = require('../Middleware/Validation/product_rules.js');
const validate = require('../Middleware/Validation/Validate.js');
const adminController = require('../Controller/admin');

router.get('/add-product' , adminController.getAddProduct);

router.post('/product' , 
            productInput , 
            validate('Admin/add-product' , {pageTitle : "Add product" , oldInput : {}}) ,
            adminController.postProduct);

router.get('/product/edit-product/:productID', 
            accessProduct , 
            validate('Errors/error' , {pageTitle : 'ERROR'}) ,
            adminController.EditProduct);

router.post('/product/delete-product/:productID' ,  
            accessProduct , 
            validate('Errors/error' , {pageTitle : 'ERROR'}) ,
            adminController.RemoveProduct);

module.exports = router;