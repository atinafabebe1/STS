const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/grade');
const advancedResult = require('../middlewares/advancedResult')
const GradeModel = require('../models/grade')

router.get('/', advancedResult(GradeModel, ['subject', 'student']), gradeController.getAllGrades);
router.get('/:id', gradeController.getGradeById);
router.post('/', gradeController.createGrade);
router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;
