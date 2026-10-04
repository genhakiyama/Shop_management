const Product = require('../Module/Product');

exports.getAddProduct = (req , res , next) => {
    res.render('add-product' , {pageTitle : 'Add product' , path : "/add-product"});
};

exports.postProduct = (req , res , next) => {
    if (req.body.id == "") req.body.id = null;  

    const product = new Product({
        id : req.body.id ,
        title : req.body.title , 
        image : req.body.image , 
        price : req.body.price ,  
        description : req.body.description
    });

    product.save();
    res.redirect('/products');
};

exports.EditProduct = (req , res , next) => {
    const editMode = req.query.edit;
    const ID = req.params.productID;
    console.log(ID);
    Product.FindbyID(ID , prod => {
        res.render('edit-product' , {product : prod , pageTittle : 'Edit product' , path : '/edit-product' , editing : editMode});
    });
};