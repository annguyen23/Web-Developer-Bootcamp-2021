const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number
});

// export the reviewSchema under name Review
module.exports = mongoose.model('Review', reviewSchema);