const express = require('express')
const router = express.Router({mergeParams: true})
const { reviewSchema } = require('../schemas')
/* const Review = require('../models/review')
const Campground = require('../models/Campground') */
const reviews = require('../controllers/reviews')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.postReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router