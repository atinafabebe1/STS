const express = require('express');
const router = express.Router();
const {
    createAcademicYear,
    getAllAcademicYears,
    getAcademicYearById,
    updateAcademicYearById,
    deleteAcademicYearById,
    addClassesToAcademicYear
} = require('../controllers/academicYears');
const advancedResults = require('../middlewares/advancedResult')
const AcademicYearModel = require('../models/academicYears')

router.post('/', createAcademicYear);
router.get('/', advancedResults(AcademicYearModel, ['classes']), getAllAcademicYears);
router.get('/:id', getAcademicYearById);
router.patch('/:id', updateAcademicYearById);
router.delete('/:id', deleteAcademicYearById);
router.post('/addClassToAcademicYear', addClassesToAcademicYear);

module.exports = router;
