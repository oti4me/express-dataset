const express = require('express');
const {
  getAllActors,
  updateActor,
  getStreak,
} = require('../controllers/actors');

const router = express.Router();

router.get('/', getAllActors);
router.put('/', updateActor);
router.get('/streak', getStreak);

module.exports = router;
