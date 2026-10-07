const Sequelize = require('sequelize');
const sequelize = require('../Helpers/database');

const CartItem = sequelize.define('cartItems' , {
    id : {
        type : Sequelize.INTEGER , 
        autoIncrement : true , 
        allowNull : false , 
        primaryKey : true 
    }  , 
    quantity : {
        type : Sequelize.INTEGER ,
        defaultValue : 0 
    }
});

module.exports = CartItem;