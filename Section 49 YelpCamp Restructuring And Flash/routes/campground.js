const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const Review = require('../models/review');
const { campgroundSchema } = require("../schemas.js");


//////////////////////////// catchAsync and ExpressError ////////////////////
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const campground = require('../models/campground');
///////////////////////////////////////////////////////////////////////

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// home page at http://localhost:3000/
// router.get('/', (req, res) => {
//     res.render('home'); // open views/home.ejs
// });

// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({
//         title: 'First Camp',
//         price: 299,
//         description: "No Description",
//         location: "In the middle of nowhere"
//     });
//     await camp.save();
//     console.log(camp);
//     res.send(camp); // open views/home.ejs
// })

// main page that show all camgrounds
router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds }); // open views/camgrounds/index.ejs
}));

// Show specific campground
router.get('/new', catchAsync((req, res) => {
    const campground = new Campground({});
    res.render('campgrounds/new'); // open views/camgrounds/index.ejs
}));

// create new campground from localhost:3000/campgrounds/new
router.post('/', validateCampground, catchAsync(async (req, res) => {
    // if nothing is entered in the form
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);

    // const camgroundSchema = Joi.object({
    //     campground: Joi.object({
    //         title: Joi.string().required(),
    //         price: Joi.number().required().min(0),
    //         image: Joi.string().required(),
    //         location: Joi.string().required(),
    //         description: Joi.string().required()
    //     }).required()
    // })
    // const { error } = campgroundSchema.validate(req.body);
    // if (error) {
    //     const msg = error.details.map(el => el.message).join(',');
    //     throw new ExpressError(msg, 400);
    // }
    // to get data from req.body, need app.use(express.urlencoded({extended: true}));
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`); // go to /campgrounds/:id
}));

// Show specific campground
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    // console.log(campground);
    res.render('campgrounds/show', { campground }); // open views/camgrounds/index.ejs
}));

// Show specific campground to edit
router.get('/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground }); // open views/camgrounds/edit.ejs
}));

// update specific campground from /campgrounds/:id/edit
router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    // second option
    // const { title, location, image, price, description } = req.body.campground;
    // const campground = await Campground.findByIdAndUpdate(id, { title: `${title}`, location: `${location}` });

    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`); // go to /campgrounds/:id
}));

// delete specific campground from /campgrounds/:id
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds"); // go to /campgrounds
}));

module.exports = router;