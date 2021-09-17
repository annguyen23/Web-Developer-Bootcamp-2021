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

// main page that show all camgrounds
router.get('/', catchAsync(campgrounds.index));

// Show specific campground
router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm));

// create new campground from localhost:3000/campgrounds/new
router.post('/', validateCampground, catchAsync(campgrounds.createCampground));

// Show specific campground
router.get('/:id', catchAsync(campgrounds.showCampground));

// Show specific campground to edit
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// update specific campground from /campgrounds/:id/edit
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

// delete specific campground from /campgrounds/:id
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;