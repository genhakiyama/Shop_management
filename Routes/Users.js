const express = require('express');
const router = express.Router();

const isOwner = require('../Middleware/Is-owner.js');
const Users = require('../Controller/Users');

const validate = require('../Middleware/Validation/Validate.js');
const {userRules} = require('../Middleware/Validation/User_rules.js');

router.get('/viewprofile/:userID', 
            userRules , 
            validate('Errors/error' , {pageTitle : 'Error'}), 
            Users.ViewProfile);

router.get('/edit-profile/:userID', 
        userRules , 
        validate('Errors/error' , {pageTitle : 'Error'}), 
        Users.editProfile);

router.post('/edit-profile/:userID',
    userRules , 
    validate('Errors/error' , {pageTitle : 'Error'}) ,
    Users.updateProfile);
    
router.post('/Logout' , Users.logout);

module.exports = router;