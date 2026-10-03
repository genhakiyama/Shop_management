const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./Helpers/path.js');
const path = require('path');

const app = express();
const adminRoutes = require('./Routes/admin');
const shopRoutes = require('./Routes/shop');

app.set('view engine' , 'pug');
app.set('views' , 'Views');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(rootDir , 'public')));

app.get('/home' , (req , res , next) => {
    res.render('home' , {pageTitle : 'Home' , path : '/home'});
});

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
