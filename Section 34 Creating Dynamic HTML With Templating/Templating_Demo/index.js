const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

// make the website public http:
app.use(express.static(path.join(__dirname, 'public')))

// using ejs template
// assume the folder have a 'views' folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // to run from different location

app.get('/', (req, res) => {
    res.render('home') // assume folder 'views' exist
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats }) // create variable cats, can call it from files in views folder
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num })
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})