const Sequelize = require('sequelize');
const sequelize = require('../Helpers/database');

const User = sequelize.define('user' , {
    id : {
        type : Sequelize.INTEGER , 
        autoIncrement : true , 
        allowNull : false , 
        primaryKey : true 
    } , 
    username : Sequelize.STRING , 
    email : Sequelize.STRING ,
    password : Sequelize.STRING , 
    imageProfile : Sequelize.STRING , 

    isVerified : {
        type : Sequelize.BOOLEAN , 
        defaultValue : false , 
        allowNull : false 
    },

    verificationToken : {
        type : Sequelize.STRING(64) , 
        allowNull : true 
    } , 

    verificationTokenExpires : {
        type : Sequelize.DATE , 
        allowNull : true 
    }
});

module.exports = User;