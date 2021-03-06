const express = require('express');
// need mergeParams because the camground id is in the app.js
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review');
const { campgroundSchema, reviewSchema } = require("../schemas.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');
const review = require('../controller/reviews');



//////////////////////////// catchAsync and ExpressError ////////////////////
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const campground = require('../models/campground');
///////////////////////////////////////////////////////////////////////

router.post('/', isLoggedIn, validateReview, catchAsync(review.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview))

module.exports = router;