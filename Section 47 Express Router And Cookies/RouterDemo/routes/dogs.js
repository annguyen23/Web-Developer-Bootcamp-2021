const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("All Dogs")
})

router.post('/', (req, res) => {
    res.send("Create New Dog")
})

router.get('/:id', (req, res) => {
    res.send("Viewing 1 Dog")
})

router.get('/:id/edit', (req, res) => {
    res.send("Editing 1 Dog")
})

module.exports = router;