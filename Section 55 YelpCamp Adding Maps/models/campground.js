const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const CampGroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// this is run after campground is deleted
CampGroundSchema.post('findOneAndDelete', async function (campground) {
    if (campground && campground.reviews.length) {
        await Review.deleteMany({
            _id: {
                $in: campground.reviews
            }
        })
    }
})


// export the CampGroundSchema under name Campground
module.exports = mongoose.model('Campground', CampGroundSchema);