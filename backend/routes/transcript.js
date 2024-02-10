const express = require('express');
const transcriptController = require('../controllers/transcript');

const router = express.Router();

router.get('/calculate/:year', transcriptController.calculateTranscriptStatistics);
//TODO manual add
//TODO previous student data / bulk add

module.exports = router;
