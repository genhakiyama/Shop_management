require('dotenv').config();
const crypto = require('crypto');

const token = crypto.randomBytes(32).toString('hex');

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

    /* Encrypt data */
        const brcypt = require('bcrypt');

    /* Authentication */
        const isAuth = require('./Middleware/Authen.js');

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
        secret : process.env.SESSION_SECRET, 
        resave : false , 
        saveUninitialized : false ,
        cookie : {
            httpOnly : true , 
            maxAge : 1000 * 60 * 60
        }
    }));    

/* SETTING ROUTES */

    app.get('/home' , (req , res , next) => { 
        res.render('home' , {pageTitle : 'Home' , path : '/home' , isVerified : req.session.isLoggedIn});
    });

    app.use((req , res , next) => {
        User.findOne({
            where :
            {
                id : req.session.userID
            }})
            .then(user => {
                if (!user) return next();
                req.user = user ;
                next();
            })
            .catch(err => {
                console.log(err);
                next();
            });
    });


app.use('/admin' , isAuth , adminRoute);
app.use('/shop' , shopRoute);
app.use('/cart' , isAuth , cartRoute);
app.use('/profile' , UserRoute);

sequelize.sync({force : false})
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
