const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: true })) // tell express to use middleware
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        console.log(products);
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({});
        console.log(products);
        res.render('products/index', { products, category: "All" })
    }

});

// when user click to the product, go the the 'products/new' page
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
});

// get the new product from user, then save and show it
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    console.log(newProduct);
    // res.send("Making your product");
    res.redirect(`products/${newProduct.id}`)
});

// how the update page of product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
});

// update the product using PUT
app.put('/products/:id', async (req, res) => {
    console.log(req.body);
    // res.send('PUT');
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${id}`)
});

// show single product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        res.send('not existed product');
    } else {
        console.log(product);
        // res.send('details page');
        res.render('products/show', { product })
    }
});

// delete product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        res.send('not product is deleted');
    } else {
        console.log(product);
        // res.send('details page');
        res.redirect('/products')
    }
});

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})
