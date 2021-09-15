const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    } else {
        res.send("Sorry not an admin")
    }
})

router.get('/topsecret', (req, res) => {
    res.send("Top Secret")
})

router.post('/deleteeverything', (req, res) => {
    res.send("Delete Everything")
})

module.exports = router;