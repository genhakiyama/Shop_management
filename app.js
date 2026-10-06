const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./Helpers/path.js');
const path = require('path');

const app = express();
const adminRoute = require('./Routes/admin');
const shopRoute = require('./Routes/shop');
const cartRoute = require('./Routes/Cart');

const sequelize = require('./Helpers/database');

app.set('view engine' , 'pug');
app.set('views' , 'Views');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(rootDir , 'public')));

app.get('/home' , (req , res , next) => { 
    res.render('home' , {pageTitle : 'Home' , path : '/home'});
});

app.use(adminRoute);
app.use(shopRoute);
app.use(cartRoute);

sequelize.sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
