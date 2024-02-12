const express = require('express');
const router = express.Router();
const {
    createClasses,
    getAllClassess,
    getClassesById,
    updateClassesById,
    deleteClassesById
} = require('../controllers/classes');
const advancedResults = require('../middlewares/advancedResult')
const ClassesModel = require('../models/classes')

router.post('/', createClasses);
router.get('/', advancedResults(ClassesModel), getAllClassess);
router.get('/:id', getClassesById);
router.patch('/:id', updateClassesById);
router.delete('/:id', deleteClassesById);

module.exports = router;
