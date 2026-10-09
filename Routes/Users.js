const express = require('express');
const router = express.Router();

const isAuth = require('../Middleware/Authen.js');

const Users = require('../Controller/Users');
router.get('/profile/viewprofile' , isAuth, Users.ViewProfile);
router.post('/profile/login' ,Users.verityAccount);
router.get('/profile' , Users.log);

module.exports = router;