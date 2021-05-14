const express = require('express')
const router = express.Router({mergeParams: true})
const { reviewSchema } = require('../schemas')
const Review = require('../models/review')
const Campground = require('../models/Campground')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {validateReview} = require('../middleware');

router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    console.log(req.params.id)
    const review = new Review(req.body.review)
    console.log(campground)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', "Successfully created new review")
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId }})
    await Review.findByIdAndDelete(req.params.reviewId)
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router