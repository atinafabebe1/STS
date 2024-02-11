const asyncHandler = require('../middlewares/async');
const Subject = require('../models/subject');
const ErrorResponse = require('../utils/errorResponse');

// Create a new subject
const createSubject = asyncHandler(async (req, res) => {
    console.log(req.body)
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json({ subject });
});

// Get all subjects
const getAllSubjects = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});

// Get a subject by ID
const getSubjectById = asyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ subject });

});

// Update a subject by ID
const updateSubjectById = asyncHandler(async (req, res, next) => {
    const allowedUpdates = ['name'];
    const updates = req.body;
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return next(new ErrorResponse('Invalid updates!', 400));
    }

    const subject = await Subject.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    if (!subject) {
        return next(new ErrorResponse('Subject not found!', 404));
    }

    res.json({ subject });

});

// Delete a subject by ID
const deleteSubjectById = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
        return next(new ErrorResponse('Subject not found!', 404));
    }
    res.status(200).json({ message: 'Subject deleted' });

});

module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubjectById,
    deleteSubjectById
};
