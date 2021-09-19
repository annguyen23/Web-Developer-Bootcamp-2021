if (process.env.MODE_ENV !== 'production') {
    require('dotenv').config();
}

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
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, useCreateIndex is always true, and it is no longer supported
    useUnifiedTopology: true
    // useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, ('connection error: ')));
db.once('open', () => {
    console.log('Datebase connected')
});
///////////////////////////////////////////////////////////////////////


//////////////////////////// ExpressError //////////////////////////
const ExpressError = require("./utils/ExpressError");
///////////////////////////////////////////////////////////////////////


//////////////////////////// Express-session //////////////////////////
const session = require('express-session')
const sessionConfig = {
    secret: "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: { //stay logged in for a week
        httpOnly: true,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
///////////////////////////////////////////////////////////////////////


//////////////////////////// connect-flash //////////////////////////
const flash = require('connect-flash');
app.use(flash());
///////////////////////////////////////////////////////////////////////


//////////////////////////// passport for authentication //////////////////////
const passport = require('passport');
const LocalStrategy = require('passport-local');
app.use(passport.initialize())
app.use(passport.session())// persistent login session
const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser()); // store in the session
passport.deserializeUser(User.deserializeUser()); // unstore in the session
///////////////////////////////////////////////////////////////////////

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'colt1@gmail.com', username: 'colt1' })
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);



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

