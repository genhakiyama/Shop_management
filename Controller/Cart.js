const Cart = require('../Module/Cart');

exports.cargoList = (req , res , next) => {
     Cart.fetchAll(cart =>{
        let total = 0;
        if (cart.length > 0){
            for(const x of cart) total += x.product.price * x.quantity;
        }
        res.render('my-cart' , {prods : cart , total : total , pageTitle : 'My cart' , path : '/my-cart'});
     });
};

exports.AddToCart = (req , res , next) => {
    const ID = req.params.cartID;
    Cart.addCargo(ID , 1);
    res.redirect('/cart');
};

