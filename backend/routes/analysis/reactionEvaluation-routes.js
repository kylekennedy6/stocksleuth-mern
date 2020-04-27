const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const reactionEvaluationController = require('../../controllers/analysis/reactionEvaluation-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:transcriptId', reactionEvaluationController.getReactionEvaluationByUserAndTranscriptId);
router.post('/', reactionEvaluationController.createReactionEvaluation);
router.patch('/:reactionEvaluationId', reactionEvaluationController.updateReactionEvaluation);

module.exports = router;