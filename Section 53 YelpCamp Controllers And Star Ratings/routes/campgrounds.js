const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const campgrounds = require('../controller/campgrounds');

const Review = require('../models/review');
const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

//////////////////////////// catchAsync and ExpressError ////////////////////
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
///////////////////////////////////////////////////////////////////////

// home page at http://localhost:3000/
// router.get('/', (req, res) => {
//     res.render('home'); // open views/home.ejs
// });

router.route('/')
    .get(catchAsync(campgrounds.index)) // main page that show all camgrounds
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground)); // create new campground from localhost:3000/campgrounds/new

// Show specific campground
router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm));


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) // Show specific campground
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground)) // update specific campground from /campgrounds/:id/edit
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)); // delete specific campground from /campgrounds/:id

// Show specific campground to edit
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;