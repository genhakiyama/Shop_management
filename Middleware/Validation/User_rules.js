const User = require('../../Module/user');
const Errors = require('../Constants/Errors');
const {
    param
} = require('express-validator');

const userRules = [
    param('userID')
        .custom(async (userID , {req}) => {
            if (!req.session.isLoggedIn) {
                throw new Error(Errors.UNAUTHORIZED.code);
            }

            if (req.session.userID != userID) {
                throw new Error(Errors.FORBIDDEN.code);
            }

            const user = await User.findOne({
                where :{
                    id : userID 
                }});
            
            if (!user) {
                throw new Error(Errors.UNAUTHORIZED.code);
            }
            req.user = user;
            return true;
        })
];

module.exports = {userRules};