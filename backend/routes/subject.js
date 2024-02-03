const express = require('express');
const router = express.Router();
const {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubjectById,
    deleteSubjectById
} = require('../controllers/subject');
const advancedResults = require('../middlewares/advancedResult')
const SubjectModel = require('../models/subject')

router.post('/', createSubject);
router.get('/', advancedResults(SubjectModel, ''), getAllSubjects);
router.get('/:id', getSubjectById);
router.patch('/:id', updateSubjectById);
router.delete('/:id', deleteSubjectById);

module.exports = router;
