const asyncHandler = require('../middlewares/async');
const Classes = require('../models/classes');
const ErrorResponse = require('../utils/errorResponse');

// Create a new classes
const createClasses = asyncHandler(async (req, res, next) => {
    const { gradeLevel, sectionsRange } = req.body;

    // Validate gradeLevel
    if (!gradeLevel || isNaN(parseInt(gradeLevel)) || !Number.isInteger(parseFloat(gradeLevel))) {
        return next(new ErrorResponse('Invalid grade level', 401));
    }

    // Validate sectionsRange
    const sections = generateSectionsArray(sectionsRange);
    if (!sections || sections.length === 0) {
        return next(new ErrorResponse('Invalid sections range format', 401));
    }

    const classes = new Classes({
        gradeLevel: parseInt(gradeLevel),
        sections,
    });

    await classes.save();
    res.status(201).json({ classes });
});

const generateSectionsArray = (range) => {
    if (!range || range.length < 3 || !/^[A-Z]-[A-Z]$/.test(range)) {
        throw new Error('Invalid sections range format');
    }

    const startChar = range.charAt(0).toUpperCase();
    const endChar = range.charAt(2).toUpperCase();
    const sections = [];

    for (let charCode = startChar.charCodeAt(0); charCode <= endChar.charCodeAt(0) - 1; charCode++) {
        sections.push(String.fromCharCode(charCode));
    }

    return sections;
};


// Get all classess
const getAllClassess = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});

// Get a classes by ID
const getClassesById = asyncHandler(async (req, res) => {
    const classes = await Classes.findById(req.params.id);

    if (!classes) {
        return res.status(404).json({ message: 'Classes not found' });
    }

    res.json({ classes });

});

// Update a classes by ID
const updateClassesById = asyncHandler(async (req, res, next) => {
    const allowedUpdates = ['name'];
    const updates = req.body;
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return next(new ErrorResponse('Invalid updates!', 400));
    }

    const classes = await Classes.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    if (!classes) {
        return next(new ErrorResponse('Classes not found!', 404));
    }

    res.json({ classes });

});

// Delete a classes by ID
const deleteClassesById = asyncHandler(async (req, res, next) => {
    const classes = await Classes.findByIdAndDelete(req.params.id);

    if (!classes) {
        return next(new ErrorResponse('Classes not found!', 404));
    }
    res.status(200).json({ message: 'Classes deleted' });

});

module.exports = {
    createClasses,
    getAllClassess,
    getClassesById,
    updateClassesById,
    deleteClassesById
};
