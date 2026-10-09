const Product = require('../Module/Product');

exports.showProduct = (req , res , next) => {
    req.user
    .getProducts()
        .then(products => {
            res.render('Products' , {prods : products , pageTitle : 'Products' , path : '/products' , isVerified : req.session.isLoggedIn});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.ProductDetails = (req , res , next) => {
    const id = req.params.productID;

   req.user
        .getProducts({
            where : {
                id : id 
            }
        })
        .then(products => {
            if (!products) return res.redirect('/home');
            return products[0];
        })
        .then(product => {
            res.render('ProductDetails' , {product : product , pageTittle : product.title , path : '/ProductDetails' , isVerified : req.session.isLoggedIn});
        })
        .catch(err => {
            console.log(err);
        });
};