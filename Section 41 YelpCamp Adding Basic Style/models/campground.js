const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampGroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String
});

// export the CampGroundSchema under name Campground
module.exports = mongoose.model('Campground', CampGroundSchema);