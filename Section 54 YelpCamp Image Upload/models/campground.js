const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");
const Schema = mongoose.Schema;

const CampGroundSchema = new Schema({
    title: String,
    images: [{
        url: String,
        filename: String
    }],
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