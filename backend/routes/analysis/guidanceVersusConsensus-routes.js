const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const guidanceVersusConsensusController = require('../../controllers/analysis/guidanceVersusConsensus-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:transcriptId', guidanceVersusConsensusController.getGuidanceVersusConsensusByUserAndTranscriptId);
router.post('/', guidanceVersusConsensusController.createGuidanceVersusConsensus);
router.patch('/:guidanceVersusConsensusId', guidanceVersusConsensusController.updateGuidanceVersusConsensus);

module.exports = router;