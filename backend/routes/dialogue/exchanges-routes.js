const express = require('express');
const checkAuth = require('../../middleware/check-auth');

const exchangesController = require('../../controllers/dialogue/exchanges-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:transcriptId/highlyRated', exchangesController.getHighlyRatedExchanges);
router.get('/primaryEvidence/:username/:transcriptId', exchangesController.getPrimaryEvidenceExchanges);
router.get('/:username/:transcriptId', exchangesController.getExchangesByTranscriptIdAndUsername);
module.exports = router;