const express = require('express');
// need mergeParams because the camground id is in the app.js
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review');
const { campgroundSchema, reviewSchema } = require("../schemas.js");
const { isLoggedIn } = require('../middleware');


//////////////////////////// catchAsync and ExpressError ////////////////////
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const campground = require('../models/campground');
///////////////////////////////////////////////////////////////////////

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    console.log("Review: " + campground.reviews);
    campground.reviews.push(review);
    // console.log(campground.reviews);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully create a new review')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findByIdAndDelete(reviewId);
    // res.send("Delete me")
    req.flash('success', 'Successfully deleted a review')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;