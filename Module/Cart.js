const Sequelize = require('sequelize');
const sequelize = require('../Helpers/database');

const Cart = sequelize.define('cart' , {
    id : {
        type : Sequelize.INTEGER , 
        autoIncrement : true , 
        allowNull : false , 
        primaryKey : true 
    } ,
    total :{
        type : Sequelize.INTEGER , 
        defaultValue : 0 
    }
});

module.exports = Cart ;