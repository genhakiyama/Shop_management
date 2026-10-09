const express = require('express');
const router = express.Router();

const isAuth = require('../Middleware/Authen.js');
const isOwner = require('../Middleware/Is-owner.js');

const Users = require('../Controller/Users');
router.get('/viewprofile/:userID' ,isAuth , isOwner , Users.ViewProfile);
router.get('/edit-profile/:userID' , isAuth ,  isOwner  , Users.editProfile);
router.post('/edit-profile/:userID' ,  isAuth  , Users.updateProfile);
router.post('/login' ,Users.verifyAccount);
router.get('/' , Users.log);
router.get('/signup' , Users.createProfile);
router.post('/signup' , Users.postProfile);
router.post('/Logout' , isAuth , Users.logout);

module.exports = router;