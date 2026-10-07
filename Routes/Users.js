const express = require('express');
const router = express.Router();

const Users = require('../Controller/Users');
router.get('/profile' , Users.ViewProfile);

module.exports = router;