const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const tendenciesController = require('../../controllers/analysis/tendencies-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/:transcriptId', tendenciesController.getTendenciesByUserAndTranscriptId);
router.post('/', tendenciesController.createTendencies);
router.patch('/:tendenciesId', tendenciesController.updateTendencies);

module.exports = router;