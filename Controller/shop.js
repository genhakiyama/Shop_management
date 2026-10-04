const Product = require('../Module/Product');

exports.showProduct = (req , res , next) => {
    Product.fetchAll(list_products => {
        res.render('Products' , {prods : list_products , pageTittle : 'products' , path : '/products' });
    });
};

exports.ProductDetails = (req , res , next) => {
    const ID = req.params.productID;

    Product.FindbyID(ID , prod => {
        res.render('ProductDetails' , {product : prod , pageTittle : 'Product Details' , path : '/ProductDetails'});
    });
};