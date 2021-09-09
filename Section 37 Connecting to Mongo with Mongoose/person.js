const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/personApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})



personSchema.virtual('fullName').
    get(function () { // call by console.log(axl.fullName);
        return this.name.first + ' ' + this.name.last;
    }).
    set(function (v) {// call by axl.fullName = 'William Rose';
        this.name.first = v.substr(0, v.indexOf(' '));
        this.name.last = v.substr(v.indexOf(' ') + 1);
    });

personSchema.pre('save', async function () {
    console.log("About To Save");
})

personSchema.post('save', async function () {
    console.log("Just Saved");
})

const Person = mongoose.model('Person', personSchema);

const tammy = new Person({ first: "Tammy", last: "sun" })
