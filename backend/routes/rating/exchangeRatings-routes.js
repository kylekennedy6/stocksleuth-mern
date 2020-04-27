const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const exchangeRatingsController = require('../../controllers/rating/exchangeRatings-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:exchangeId', exchangeRatingsController.getExchangeRatingByUserAndExchangeId);

router.post('/', exchangeRatingsController.createExchangeRating);

router.patch('/:exchangeRatingId', exchangeRatingsController.updateExchangeRating);

module.exports = router;