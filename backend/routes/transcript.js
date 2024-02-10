const express = require('express');
const transcriptController = require('../controllers/transcript');
const advancedResult = require('../middlewares/advancedResult')
const TranscriptModel = require('../models/transcript')
const router = express.Router();

router.get('/', advancedResult(TranscriptModel, 'grades'), transcriptController.getAlltranscript);
router.get('/calculate/:year', transcriptController.calculateTranscriptStatistics);
//TODO manual add
//TODO previous student data / bulk add

module.exports = router;
