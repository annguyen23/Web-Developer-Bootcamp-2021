const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: String
});

// export the reviewSchema under name Review
module.exports = mongoose.model('Review', reviewSchema);