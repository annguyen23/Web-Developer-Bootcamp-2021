//////////////////////////// express //////////////////////////////////
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true })); // to get data from req.body
///////////////////////////////////////////////////////////////////////

//////////////////////////// method-override ////////////////////////
const methodOverride = require('method-override');
app.use(methodOverride("_method")); // to use it, add '_method=<PUT,DELETE>'
///////////////////////////////////////////////////////////////////////


//////////////////////////// path //////////////////////////////////
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
///////////////////////////////////////////////////////////////////////


//////////////////////////// ejs-mate //////////////////////////////////
const ejsMate = require("ejs-mate"); // to edit layout for all website easier with layouts/boilerplate.ejs
app.engine('ejs', ejsMate)
///////////////////////////////////////////////////////////////////////

//////////////////////////// joi ////////////////////////////////////////
const Joi = require("joi");
///////////////////////////////////////////////////////////////////////

//////////////////////////// DATABASE SECTION ////////////////////////
const mongoose = require("mongoose");
const Campground = require('./models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, useCreateIndex is always true, and it is no longer supported
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, ('connection error: ')));
db.once('open', () => {
    console.log('Datebase connected')
});
///////////////////////////////////////////////////////////////////////

//////////////////////////// catchAsync and ExpressError ////////////////////
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const campground = require('./models/campground');
///////////////////////////////////////////////////////////////////////


const { campgroundSchema } = require("./schemas.js");

// home page at http://localhost:3000/
app.get('/', (req, res) => {
    res.render('home'); // open views/home.ejs
});

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

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// main page that show all camgrounds
app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds }); // open views/camgrounds/index.ejs
}));

// Show specific campground
app.get('/campgrounds/new', catchAsync((req, res) => {
    const campground = new Campground({});
    res.render('campgrounds/new'); // open views/camgrounds/index.ejs
}));

// create new campground from localhost:3000/campgrounds/new
app.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
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
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground }); // open views/camgrounds/index.ejs
}));

// Show specific campground to edit
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground }); // open views/camgrounds/edit.ejs
}));

// update specific campground from /campgrounds/:id/edit
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    // second option
    // const { title, location, image, price, description } = req.body.campground;
    // const campground = await Campground.findByIdAndUpdate(id, { title: `${title}`, location: `${location}` });

    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`); // go to /campgrounds/:id
}));

// delete specific campground from /campgrounds/:id
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds"); // go to /campgrounds
}));

// all for all request
// * for all paths
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log("Listen to port 3000");
})

