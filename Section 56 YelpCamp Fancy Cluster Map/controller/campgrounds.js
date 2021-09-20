const Campground = require('../models/campground');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    console.log(res.locals.currentUser)
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds }); // open views/camgrounds/index.ejs
}

module.exports.renderNewForm = async (req, res) => {
    res.render('campgrounds/new'); // open views/camgrounds/index.ejs
}

module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id;
    await campground.save();
    console.log(campground)
    req.flash('success', 'Successfully made a new campground')
    res.redirect(`/campgrounds/${campground._id}`); // go to /campgrounds/:id
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(campground);
    if (!campground) {
        req.flash('error', 'Cannot find the campground!');
        return res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/show', { campground }); // open views/camgrounds/index.ejs
}

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find the campground!');
        return res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/edit', { campground }); // open views/camgrounds/edit.ejs
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    // second option
    // const { title, location, image, price, description } = req.body.campground;
    // const campground = await Campground.findByIdAndUpdate(id, { title: `${title}`, location: `${location}` });
    console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated a campground')
    res.redirect(`/campgrounds/${campground._id}`); // go to /campgrounds/:id
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a campground')
    res.redirect("/campgrounds"); // go to /campgrounds
}

