const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const openingStatementsController = require('../../controllers/dialogue/openingStatements-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:transcriptId/highlyRated', openingStatementsController.getHighlyRatedOpeningStatements);
router.get('/primaryEvidence/:username/:transcriptId', openingStatementsController.getPrimaryEvidenceOpeningStatements);
router.get('/:username/:transcriptId', openingStatementsController.getOpeningStatementsByTranscriptIdAndUsername);

module.exports = router;