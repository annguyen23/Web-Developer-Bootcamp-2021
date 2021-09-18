const Campground = require('../models/campground');
const { cloudinary } = require("../cloudinary")

module.exports.index = async (req, res) => {
    console.log(res.locals.currentUser)
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds }); // open views/camgrounds/index.ejs
}

module.exports.renderNewForm = async (req, res) => {
    res.render('campgrounds/new'); // open views/camgrounds/index.ejs
}

module.exports.createCampground = async (req, res) => {
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