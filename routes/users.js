const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')

router.get('/register', users.renderRegisterForm)

router.post('/register', catchAsync(users.signUpUser))

router.get('/login', users.renderLoginForm)
                      
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.postLogin)

router.get('/logout', users.logout)

module.exports = router  