const express = require('express');
const router = express.Router();

const isAuth = require('../Middleware/Authen.js');
const isOwner = require('../Middleware/Is-owner.js');

const Authen = require('../Controller/Authentication.js');

router.post('/login' , Authen.verifyAccount);
router.get('/verify-Email/' , Authen.getVerifyEmail);
router.post('/signup' , Authen.postProfile);
router.get('/' , Authen.log);

module.exports = router; 