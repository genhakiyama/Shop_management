const express = require('express');
const router = express.Router();

const isAuth = require('../Middleware/Authen.js');
const isOwner = require('../Middleware/Is-owner.js');

const Users = require('../Controller/Users');

router.get('/viewprofile/:userID', isOwner , Users.ViewProfile);
router.get('/edit-profile/:userID', isOwner  , Users.editProfile);
router.post('/edit-profile/:userID', isOwner , Users.updateProfile);
router.post('/Logout' , Users.logout);

module.exports = router;