const express = require('express');
const router = express.Router();
const {
    createStream,
    getAllStreams,
    getStreamById,
    updateStreamById,
    deleteStreamById,
    addSubjectToStream
} = require('../controllers/stream');
const advancedResults = require('../middlewares/advancedResult')
const StreamModel = require('../models/stream')

router.post('/', createStream);
router.get('/', advancedResults(StreamModel, 'subjects'), getAllStreams);
router.get('/:id', getStreamById);
router.patch('/:id', updateStreamById);
router.delete('/:id', deleteStreamById);
router.post('/addSubjectToStream', addSubjectToStream);

module.exports = router;
