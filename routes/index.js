const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.send('<h1>Joseph Smith</h1>');
});

module.exports = router;
