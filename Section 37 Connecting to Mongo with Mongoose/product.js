const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const productSchema = new mongoose.Schema({
    name: { // allow to add more information
        type: String,
        require: true,// name is require for each product
    },
    price: {
        type: Number,
        require: true,// name is require for each product
    }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: 'Mountain Bike', price: 999 })
bike.save()
    .then(data => {
        console.log('It Worked');
        console.log(data);
    })
    .catch(err => {
        console.log("Oh No Error!");
        console.log(err.errors.name.properties.message);
    })
