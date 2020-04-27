const express = require('express');

const transcriptsController = require('../controllers/transcripts-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/:username/archives/:archiveType', transcriptsController.getArchives);

router.get('/:username/unread', transcriptsController.getUnreadTranscripts);

router.get('/:tid', transcriptsController.getTranscriptById);

router.get('/ticker/:tickerid', transcriptsController.getTranscriptsByTickerId);

module.exports = router;