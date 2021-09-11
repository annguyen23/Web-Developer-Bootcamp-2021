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
})
///////////////////////////////////////////////////////////////////////


// home page at http://localhost:3000/
app.get('/', (req, res) => {
    res.render('home'); // open views/home.ejs
})

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
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds }); // open views/camgrounds/index.ejs
})

// Show specific campground
app.get('/campgrounds/new', (req, res) => {
    const campground = new Campground({});
    res.render('campgrounds/new'); // open views/camgrounds/index.ejs
})

// create new campground from localhost:3000/campgrounds/new
app.post('/campgrounds', async (req, res) => {
    // to get data from req.body, need app.use(express.urlencoded({extended: true}));
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`); // go to /campgrounds/:id
})

// Show specific campground
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground }); // open views/camgrounds/index.ejs
})

// Show specific campground to edit
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground }); // open views/camgrounds/edit.ejs
})

// update specific campground from /campgrounds/:id/edit
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    // second option
    // const { title, location, image, price, description } = req.body.campground;
    // const campground = await Campground.findByIdAndUpdate(id, { title: `${title}`, location: `${location}` });

    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`); // go to /campgrounds/:id
})

// delete specific campground from /campgrounds/:id
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds"); // go to /campgrounds
})

app.listen(3000, () => {
    console.log("Listen to port 3000");
})