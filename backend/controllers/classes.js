const asyncHandler = require('../middlewares/async');
const Classes = require('../models/classes');
const ErrorResponse = require('../utils/errorResponse');

// Create a new classes
const createClasses = asyncHandler(async (req, res) => {
    console.log(req.body)
    const classes = new Classes(req.body);
    await classes.save();
    res.status(201).json({ classes });
});

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
