const Sequelize = require('sequelize');
const sequelize = require('../Helpers/database');

const Product = sequelize.define('product' , {
    id : {
        type : Sequelize.INTEGER , 
        autoIncrement : true , 
        allowNull : false , 
        primaryKey : true 
    } , 
    title : Sequelize.STRING , 
    price : {
        type : Sequelize.DOUBLE , 
        allowNull : false 
    } , 
    image : {
        type : Sequelize.STRING
    },
    description : {
        type : Sequelize.STRING , 
        allowNull : true 
    }
});

module.exports = Product;