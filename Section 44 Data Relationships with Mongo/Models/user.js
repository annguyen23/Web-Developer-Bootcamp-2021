const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection open!");
    })
    .catch(err => {
        console.log("Oh no! Mongo connection error!");
        console.log(err);
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [{
        // _id: {id: false}, to not set id for addresses
        street: String,
        city: String,
        state: String,
        country: {
            type: String,
            re: true
        }
    }]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: "123 Sesame St.",
        city: "New York",
        state: "NY",
        country: "USA"
    })
    const res = await u.save();
    console.log(u);
}

makeUser();