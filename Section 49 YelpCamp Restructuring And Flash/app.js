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
app.use(express.static(path.join(__dirname, 'public'))); // to access files from folder public
///////////////////////////////////////////////////////////////////////


//////////////////////////// ejs-mate //////////////////////////////////
const ejsMate = require("ejs-mate"); // to edit layout for all website easier with layouts/boilerplate.ejs
app.engine('ejs', ejsMate)
///////////////////////////////////////////////////////////////////////

//////////////////////////// joi and validation///////////////////////////////////
const Joi = require("joi");

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}
///////////////////////////////////////////////////////////////////////

//////////////////////////// DATABASE SECTION ////////////////////////
const mongoose = require("mongoose");
const Campground = require('./models/campground');
const Review = require('./models/review');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, useCreateIndex is always true, and it is no longer supported
    useUnifiedTopology: true,
    useFindAndModify: false
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

const campgrounds = require('./routes/campground');
const reviews = require('./routes/reviews');

app.use("/campgrounds", campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

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

