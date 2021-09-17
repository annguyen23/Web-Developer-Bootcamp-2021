const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const CampGroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
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