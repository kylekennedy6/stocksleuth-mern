const express = require('express');
const tickersController = require('../controllers/tickers-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/transcript/:transcriptId', tickersController.getTickerByTranscriptId);

module.exports = router;