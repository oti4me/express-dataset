const express = require('express');
const { addEvent, getAllEvents, getByActor } = require('../controllers/events');
const { addEventValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/', addEventValidation, addEvent);
router.get('/', getAllEvents);
router.get('/actors/:id', getByActor);
module.exports = router;
