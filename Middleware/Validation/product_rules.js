const ERRORS = require('../Constants/Errors');
const Product = require('../../Module/Product');
const {
    body , 
    param , 
    query , 
    validationResult 
} = require('express-validator');

const productInput = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is Required')
        .bail()
        .isLength({ min : 2 , max : 100})
        .withMessage('Title must be 2-100 characters') , 

    body('price')
        .isFloat({min : 0 })
        .withMessage('Price must be greater than or equal 0')
        .bail() ,
    
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
];

const accessProduct = [
    param('productID')
        .custom(async (productID , {req}) => {
            if (!req.session.isLoggedIn) throw new Error(ERRORS.UNAUTHORIZED.code);
            const [product] = await req.user.getProducts({
                where : {
                    id : productID
                } , 
                limit : 1
            });
            if (!product) throw new Error(ERRORS.NOT_FOUND.code);
            req.product = product;
            return true;
        })
];


module.exports = {productInput , accessProduct};