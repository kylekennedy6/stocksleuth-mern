const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const sentimentController = require('../../controllers/analysis/sentiment-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:transcriptId', sentimentController.getSentimentByUserAndTranscriptId);
router.post('/', sentimentController.createSentiment);
router.patch('/:sentimentId', sentimentController.updateSentiment);

module.exports = router;