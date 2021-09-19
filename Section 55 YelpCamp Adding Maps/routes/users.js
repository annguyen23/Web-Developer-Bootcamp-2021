const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')
const users = require('../controller/users');

//////////////////////////// catchAsync and ExpressError ////////////////////
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
///////////////////////////////////////////////////////////////////////


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));


router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;