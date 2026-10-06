const Product = require('../Module/Product');

exports.showProduct = (req , res , next) => {
    Product.findAll()
        .then(products => {
            res.render('Products' , {prods : products , pageTitle : 'Products' , path : '/products'});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.ProductDetails = (req , res , next) => {
    const id = req.params.productID;

    Product.findByPk(id)
        .then(product => {
            res.render('ProductDetails' , {product : product , pageTittle : product.title , path : '/ProductDetails'});
        })
        .catch(err => {
            console.log(err);
        });
};