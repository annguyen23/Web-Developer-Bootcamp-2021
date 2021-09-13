const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const userSchema = new Schema({
    username: String,
    age: Number
});

const tweetSchema = new Schema({
    tweet: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" }
});


const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);


// one to Many
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Farm = mongoose.model('Farm', farmSchema);


const makeTweets = async () => {
    const user = new User({ username: "chickenfan", age: 61 });
    const tweet1 = new Tweet({ text: "omg", likes: 4 });
    tweet1.user = user;
    user.save();
    tweet1.save();
    console.log(Tweet.find({}));
}

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username');
    console.log(t);
}

findTweet();