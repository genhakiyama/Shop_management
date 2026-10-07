const { Op } = require('sequelize');
const Product = require('../Module/Product');

exports.getAddProduct = (req , res , next) => {
    res.render('add-product' , {pageTitle : 'Add product' , path : "/add-product"});
};

exports.postProduct = (req , res , next) => {
    const title = req.body.title ;
    const image = req.body.image ;
    const price = req.body.price ;
    const description = req.body.description;
    const id = req.body.id;
        Product.findByPk(id)
            .then(product => {
                if (!product) {
                    return req.user.createProduct({
                       title : title , 
                       price : price , 
                       image : image , 
                       description : description 
                    });
                }
                product.title = title ,
                product.price = price,
                product.image = image,
                product.description = description,
                product.save();
            })
            .then(result => {
                res.redirect('/products');
            })
            .catch(err => {
                console.log(err);
            });
};

exports.EditProduct = (req , res , next) => {
    const editMode = req.query.edit;
    const id = req.params.productID;
    req.user
        .getProducts({
            where : {
                id : id 
            }
        }).
        then(products => {
            if (!products) return res.redirect('/home');
            return products[0];
        })
        .then(prod => {
             res.render('edit-product' , {product : prod , pageTittle : 'Edit product' , path : '/edit-product' , editing : editMode});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.RemoveProduct = (req , res , next) => {
    const id = req.params.productID;
    Product.findByPk(id)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });
};