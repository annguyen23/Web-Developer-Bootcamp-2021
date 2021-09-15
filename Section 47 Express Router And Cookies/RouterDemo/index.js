const express = require('express');
const app = express();
const shelterRouters = require('./routes/shelters')
const dogRouters = require('./routes/dogs')
const adminRouters = require('./routes/admin')

app.use('/', shelterRouters);
app.use('/dogs', dogRouters);
app.use('/admin', adminRouters);



app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})
