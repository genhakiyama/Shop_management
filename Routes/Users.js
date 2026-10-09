const express = require('express');
const router = express.Router();

const isAuth = require('../Middleware/Authen.js');
const isOwner = require('../Middleware/Is-owner.js');

const Users = require('../Controller/Users');
router.get('/viewprofile/:userID' ,isAuth , isOwner , Users.ViewProfile);
router.get('/edit-profile/:userID' , isAuth ,  isOwner  , Users.editProfile);
// router.post('/profile/edit-profile/:userID' ,  isAuth , isOwner , Users.updateProfile);
router.post('/login' ,Users.verifyAccount);
router.get('/' , Users.log);

module.exports = router;