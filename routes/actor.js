const express = require('express');
const { getAllActors, updateActor } = require('../controllers/actors');

const router = express.Router();

router.get('/', getAllActors);
router.put('/', updateActor);

module.exports = router;
