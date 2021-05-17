const express = require('express')
const router = express.Router()
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const { reset } = require('nodemon')

router.get('/', catchAsync(campgrounds.index))

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createNewCamp))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.get('/:id', catchAsync(campgrounds.getCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router