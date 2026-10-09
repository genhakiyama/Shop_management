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
    imageProfile : Sequelize.STRING
});

module.exports = User;