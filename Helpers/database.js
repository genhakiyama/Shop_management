const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'shop' , 
    'root' , 
    'nguyen1407@' ,  {
        dialect : 'mysql' ,
        host : '127.0.0.1'
});

module.exports = sequelize;