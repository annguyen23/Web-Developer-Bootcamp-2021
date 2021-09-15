const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser("secret"));


app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    console.log(req.cookies)
    res.send(`Hey there, ${name}`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta');
    res.cookie('animal', 'harlequin shrimp')
    res.send('OK SENT YOU A COOKIE!!!')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('OK SIGN YOUR COOKIE!!!')
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})
