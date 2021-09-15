const express = require('express');
const router = express.Router();

router.get('/shelters', (req, res) => {
    res.send("All Shelters")
})

router.post('/shelters', (req, res) => {
    res.send("Create New Shelter")
})

router.get('/shelters/:id', (req, res) => {
    res.send("Viewing 1 shelter")
})

router.get('/shelters/:id/edit', (req, res) => {
    res.send("Editing 1 shelter")
})

module.exports = router;