
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
        maxLength: 20
    },
    price: {
        type: Number,
        require: true,// name is require for each product
        min: [0, 'Price must be positive ya dodo!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String], // an array of String
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L'] // size can only be S, M, or L
    }
});




//runValidators: true force Mongoose to apply all constraint like min
// Product.findOneAndUpdate({ name: 'Mountain Bike' }, { price: 9 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log('findOneAndUpdate Worked');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh No Error!");
//         console.log(err);
//     })

// productSchema.methods.greet = function () {
//     console.log("Hello");
// }
productSchema.methods.greet = function () {
    console.log("HELLLO!!! HI!! HOWDY!!! ")
    console.log(`- from ${this.name}`)
};

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}


productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

// set all product to be on sale
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

// need to be after productSchema.methods.<method>
//before creating Product
const Product = mongoose.model('Product', productSchema);


const bike = new Product({ name: 'Mountain Bike', price: 100, categories: ['cycling', 'Safety', 123], size: 'S' })
bike.save()
    .then(data => {
        console.log('It Worked');
        console.log(data);
    })
    .catch(err => {
        console.log("Oh No Error!");
        console.log(err);
    })

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike', price: 100 });
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}
// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 9 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!")
//         console.log(err)
//     })

findProduct();

