const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const transcriptRatingsController = require('../../controllers/rating/transcriptRatings-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/tierOne', transcriptRatingsController.getTierOneTranscripts);

router.get('/:username/tierTwo', transcriptRatingsController.getTierTwoTranscripts);

router.get('/:username/:transcriptId', transcriptRatingsController.getTranscriptRatingByUserAndTranscriptId);

router.post('/', transcriptRatingsController.createTranscriptRating);

router.patch('/:transcriptRatingId', transcriptRatingsController.updateTranscriptRating);

module.exports = router;