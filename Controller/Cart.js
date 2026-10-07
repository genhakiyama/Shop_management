const Cart = require('../Module/Cart');
const CartItem = require('../Module/Cart-item');
const Product = require('../Module/Product');

const updateCartTotal = cart => {
    return cart.getProducts()
                .then(products => {
                    const total = products.reduce((sum , p) => sum + p.price * p.cartItems.quantity , 0);
                    cart.total = total ;
                    console.log(products);
                    return cart.save();
                })
                .catch(err => {
                    console.log(err);
                })
};

exports.cargoList = (req , res , next) => {
    let fetchedCart;
    req.user 
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts()
                            .then(products => {                          
                                res.render('my-cart' , {prods : products , total : fetchedCart.total , pageTitle : 'My cart' , path : '/my-cart'});
                            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.AddToCart = (req , res , next) => {
    const id = req.params.cartID;
    let fetchedCart;
    let new_quantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where : {id : id}});
        })
        .then(products => {
            if (products.length > 0) {
                const product = products[0];
                new_quantity = product.cartItems.quantity + 1;
                return product;
            }
            return Product.findByPk(id);
        })
        .then(product => {
            return fetchedCart.addProducts(
                product , {
                    through : {
                        quantity : new_quantity
                    }
                }
            );
        })
        .then(() => updateCartTotal(fetchedCart))
        .then(() => res.redirect('/cart'))
        .catch(err => {
            console.log(err);
        });
};

exports.RemoveCart = (req , res , next) => {
    const id = req.params.cartID;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where : {id : id}});
        })
        .then(products => {
            const product = products[0];
            if (!product) return;
            const  quantity = product.cartItems.quantity;
            if (quantity > 1){
                product.cartItems.quantity = product.cartItems.quantity - 1;
                return product.cartItems.save();
            }
            return product.cartItems.destroy();
        })
        .then(() => updateCartTotal(fetchedCart))
        .then(() => res.redirect('/cart'))
        .catch(err => {
            console.log(err);
        });
    res.redirect('/cart');
};