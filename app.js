const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./Helpers/path.js');
const path = require('path');


/* ROUTES */
    const app = express();

    /* PARSING JSON  */
        app.use(bodyParser.urlencoded({extended : true}));
        app.use(express.static(path.join(rootDir , 'public')));

    const adminRoute = require('./Routes/admin');
    const shopRoute = require('./Routes/shop');
    const cartRoute = require('./Routes/Cart');
    const UserRoute = require('./Routes/Users.js');

/* Sessions and Cookie */
    const session = require('express-session');
    const MySQLStore = require('express-mysql-session')(session);

    const cookieParser = require('cookie-parser');
    const { doubleCsrf } = require('csrf-csrf');

app.use(cookieParser());

/* DATABASE */
    const sequelize = require('./Helpers/database');
    const Product = require('./Module/Product.js');
    const User = require('./Module/user.js');
    const Cart = require('./Module/Cart.js');
    const CartItem = require('./Module/Cart-item.js');

/* CONNECTING DATA BASE */
    Product.belongsTo(User , {constraints : true , onDelete : 'CASCADE'});
    User.hasMany(Product);
    User.hasOne(Cart);
    Cart.belongsTo(User) ;
    Cart.belongsToMany(Product , {through : CartItem});
    Product.belongsToMany(Cart , {through : CartItem});

/* SETTING VIEW ENGINE  */
    app.set('view engine' , 'pug');
    app.set('views' , 'Views');
/* SESSION */
    app.use(session({
        secret : "my-secret-key" , 
        resave : false , 
        saveUninitialized : false ,
        cookie : {
            httpOnly : true , 
            maxAge : 1000 * 60 * 60
        }
    }));    

/* SETTING ROUTES */
    app.use((req , res , next) => {
        User.findByPk(1)
            .then(user => {
                req.user = user ;
                next();
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.get('/home' , (req , res , next) => { 
        res.render('home' , {pageTitle : 'Home' , path : '/home' , isVerified : req.session.isLoggedIn});
    });

app.use(adminRoute);
app.use(shopRoute);
app.use(cartRoute);
app.use(UserRoute);

sequelize.sync({force : false})
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                username : 'Nguyen' , 
                email : 'Sandundertailroal@gmail.com' , 
                password : '12345678'
            })
        }
        return user ;
    })
    .then(user => {
        return user.getCart()
                        .then(cart => {
                            if (!cart) return user.createCart();
                            return cart;
                        });
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
