const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const tradeSubmissionController = require('../../controllers/analysis/tradeSubmission-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/upcomingTrades', tradeSubmissionController.getTradeSubmissionTranscriptsByUserId);
router.get('/:username/:transcriptId', tradeSubmissionController.getTradeSubmissionByUserAndTranscriptId);
router.post('/', tradeSubmissionController.createTradeSubmission);
router.patch('/:tradeSubmissionId', tradeSubmissionController.updateTradeSubmission);

module.exports = router;