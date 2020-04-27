const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const pastEventController = require('../../controllers/analysis/pastEvent-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:transcriptId', pastEventController.getPastEventsByUserAndTranscriptId);
router.post('/', pastEventController.createPastEvent);
router.patch('/:pastEventId', pastEventController.updatePastEvent);

module.exports = router;