const express = require('express');
const transcriptController = require('../controllers/transcript');

const router = express.Router();

router.get('/calculate/:fromYear/:toYear', transcriptController.calculateTranscriptStatistics);
//TODO manual add
//TODO previous student data /importing

module.exports = router;
