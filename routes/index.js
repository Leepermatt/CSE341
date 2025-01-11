const express = require('express');
const { displayName } = require('../controllers/homeController');
const router = express.Router();

router.get('/', displayName);

module.exports = router;
