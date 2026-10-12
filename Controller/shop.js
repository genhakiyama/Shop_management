const Product = require('../Module/Product');

exports.showProduct = (req , res , next) => {
    Product.findAll()
        .then(products => {
            res.render('Shop/Products' , {prods   : products , pageTitle : 'Products' , isVerified : req.session.isLoggedIn});
        })
        .catch(err => {
            res.render('Shop/Products' , {prods : [] , pageTitle : 'Products' , isVerified : req.session.isLoggedIn});
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
            res.render('Product/ProductDetails' , 
            {   
                product : product , 
                pageTittle : product.title , 
                isVerified : req.session.isLoggedIn , 
                userID : req.session.userID , 
                editMode : req.session.userID == product.userId 
            });
        })
        .catch(err => {
            console.log(err);
        });
};