const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

//old ways, newer ways above using then catch
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log('CONNECTION OPEN')
// })
const movieSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    year: Number,
    score: Number,
    rating: String
});

const Blog = mongoose.model('Movie', movieSchema);
