const Sequelize = require('sequelize');
const sequelize = require('../Helpers/database');

const CartItem = sequelize.define('cartItems' , {
    id : {
        type : Sequelize.INTEGER , 
        autoIncrement : true , 
        allowNull : false , 
        primaryKey : true 
    }  , 
    quantity : Sequelize.INTEGER 
});

module.exports = CartItem;