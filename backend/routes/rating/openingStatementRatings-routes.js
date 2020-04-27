const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const openingStatementRatingsController = require('../../controllers/rating/openingStatementRatings-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:openingStatementId', openingStatementRatingsController.getOpeningStatementRatingByUserAndOpeningStatementId);

router.post('/', openingStatementRatingsController.createOpeningStatementRating);

router.patch('/:openingStatementRatingId', openingStatementRatingsController.updateOpeningStatementRating);

module.exports = router;