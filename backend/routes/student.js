const express = require('express');
const router = express.Router();
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
} = require('../controllers/student');
const advancedResult = require('../middlewares/advancedResult')
const StudentModel = require('../models/student')

router.post('/', createStudent);
// router.get('/', advancedResult(StudentModel, ['grades', 'student'], ["subject"]), transcriptController.getAlltranscript);

router.get('/', advancedResult(StudentModel, ['stream'], ['subjects']), getAllStudents);
router.get('/:id', getStudentById);
router.patch('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);

module.exports = router;
