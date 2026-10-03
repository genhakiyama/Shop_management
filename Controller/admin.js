const Product = require('../Module/Product');

exports.getAddProduct = (req , res , next) => {
    res.render('add-product' , {pageTitle : 'Add product' , path : "/add-product"});
};

exports.postProduct = (req , res , next) => {
    const product = new Product({
        title : req.body.title ,
        image : req.body.image, 
        price : req.body.price , 
        description : req.body.description
    });
    product.save();
    res.redirect('/products');
};


