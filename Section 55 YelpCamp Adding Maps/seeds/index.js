const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const sample = (array) => array[Math.floor(Math.random() * array.length)]

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



const seedDB = async () => {
    await Campground.deleteMany({}); // delete everything
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61444fa70d9ba71e78535137',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            geometry: {
                type: "Point",
                coordinates: [-87.638519, 41.934272]
            },
            // random images from unsplash collection
            // image: "https://source.unsplash.com/collection/3788774/600x400",
            images: [
                {
                    url: 'https://res.cloudinary.com/duogomqpv/image/upload/v1631969175/houcxbrld8gwgxsvij5t.jpg',
                    filename: 'houcxbrld8gwgxsvij5t',
                },
                {
                    url: 'https://res.cloudinary.com/duogomqpv/image/upload/v1631969175/y6tihhbrjht9kukojmvv.jpg',
                    filename: 'y6tihhbrjht9kukojmvv',
                },
                {
                    url: 'https://res.cloudinary.com/duogomqpv/image/upload/v1631969175/im8rkarahbv5tkuc0av1.jpg',
                    filename: 'im8rkarahbv5tkuc0av1',
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore inventore excepturi beatae? Sit dolore corporis esse earum, nemo ducimus, inventore repudiandae excepturi maxime culpa omnis ratione nobis quibusdam, minima itaque?"
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close(); // close database
})