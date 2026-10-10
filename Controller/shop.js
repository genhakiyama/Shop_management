const Product = require('../Module/Product');

exports.showProduct = (req , res , next) => {
    Product.findAll()
        .then(products => {
            res.render('Products' , {prods : products , pageTitle : 'Products' , path : '/products' , isVerified : req.session.isLoggedIn});
        })
        .catch(err => {
            res.render('Products' , {prods : [] , pageTitle : 'Products' , path : '/products' , isVerified : req.session.isLoggedIn});
        });
};

exports.ProductDetails = (req , res , next) => {
    const id = req.params.productID;
    
   Product.findOne({
    where : {
        id : id 
    } })
        .then(product => {
            if (!product) return res.redirect('/shop/products');
            res.render('ProductDetails' , 
            {   
                product : product , 
                pageTittle : product.title , 
                path : '/ProductDetails' , 
                isVerified : req.session.isLoggedIn , 
                userID : req.session.userID , 
                editMode : req.session.userID == product.userId
            });
        })
        .catch(err => {
            console.log(err);
        });
};