const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    console.log("Review: " + campground.reviews);
    review.author = req.user._id;
    campground.reviews.push(review);
    console.log(campground.reviews);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully create a new review')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findByIdAndDelete(reviewId);
    // res.send("Delete me")
    req.flash('success', 'Successfully deleted a review')
    res.redirect(`/campgrounds/${id}`)
}