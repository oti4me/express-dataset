const express = require('express');
const { getAllActors } = require('../controllers/actors');

const router = express.Router();

router.get('/', getAllActors);

module.exports = router;
