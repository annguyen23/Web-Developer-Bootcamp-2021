const express = require('express');
const app = express();

///////////////////// morgan ///////////////////////////////////////////
const morgan = require('morgan');
// app.use(morgan('tiny')); // on every request, use middlware morgan "tiny"
// GET / - - - - ms

app.use(morgan('common')); // Standard Apache common log output.
// GET / - - - - ms
// ::1 - - [10/Sep/2021:12:43:16 +0000] "GET / HTTP/1.1" - 
////////////////////////////////////////////////////////////////////////

// app.use(() => { // run on every incoming request
//     console.log("Hey!!!")
// })

app.use((req, res, next) => {
    // req.method = "GET"; // change all type pf request to be GET request
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next(); //without the next() the code stop here, no further code is run
})

app.use('/dogs', (req, res, next) => { // for localhost:3000/dogs
    console.log("I LOVE DOGS!!")
    next(); //without the next() the code stop here, no further code is run
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    // if password is chickennugget, run the next middleware
    if (password === 'chickennugget') {
        next();
    }
    // if not, send "YOU NEED A PASSWORD!"
    else res.send("YOU NEED A PASSWORD!")
}


// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!") // print 1st
//     return next();
//     console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()") // print 4th
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE!!!") // print 2nd
//     return next();
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY THIRD MIDDLEWARE!!!") // print 3rd
//     return next();
// })


app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})

// to get secret, need to pass verifyPassword() that check the password
app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.use((req, res) => {
    // if no res.send() is execute, change status code to 404 and send ('Not found')
    res.status(404).send('NOT FOUND!')
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})