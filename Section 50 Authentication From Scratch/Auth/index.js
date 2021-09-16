const express = require('express');
const app = express();
const User = require('./models/user')

app.get('secret', (req, res) => {
    res.send('This is a secret')
})

app.listen(3000, () => {
    console.log('Serving your app!')
})