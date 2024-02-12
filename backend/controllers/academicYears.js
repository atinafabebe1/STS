const asyncHandler = require('../middlewares/async');
const AcademicYear = require('../models/academicYears');
const Classes = require('../models/classes');
const ErrorResponse = require('../utils/errorResponse');

// Create a new academicYear
const createAcademicYear = asyncHandler(async (req, res) => {
    const academicYear = new AcademicYear(req.body);
    await academicYear.save();
    res.json({ academicYear });
});

// Get all academicYears
const getAllAcademicYears = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});

// Get a academicYear by ID
const getAcademicYearById = asyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.findById(req.params.id);

    if (!academicYear) {
        return next(new ErrorResponse('AcademicYear not found', 404));
    }

    res.json({ academicYear });
});

// Update a academicYear by ID
const updateAcademicYearById = asyncHandler(async (req, res) => {
    const allowedUpdates = ['name'];
    const updates = req.body;
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return next(new ErrorResponse('Invalid updates!', 400));
    }

    const academicYear = await AcademicYear.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    if (!academicYear) {
        return next(new ErrorResponse('AcademicYear not found!', 404));
    }

    res.json({ academicYear });
});

// Delete a academicYear by ID
const deleteAcademicYearById = asyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.findByIdAndDelete(req.params.id);

    if (!academicYear) {
        return next(new ErrorResponse('AcademicYear not found!', 404));
    }

    res.json({ msg: 'AcademicYear deleted' });
});

// Add classes to a academicYear
const addClassesToAcademicYear = asyncHandler(async (req, res) => {
    const { academicYearId, name } = req.body;

    // Find academicYear by ID
    const academicYear = await AcademicYear.findById(academicYearId);
    if (!academicYear) {
        return next(new ErrorResponse('AcademicYear not found', 404));
    }

    const classes = await Classes.find({ name: { $in: name } });

    if (classes.length === 0) {
        return next(new ErrorResponse('Classess not found', 404));
    }

    academicYear.classes?.push(...classes.map(gradeLevel => gradeLevel._id));

    await academicYear.save();

    res.status(200).json({ message: 'Classess added to academicYear successfully', academicYear });
});

module.exports = {
    createAcademicYear,
    getAllAcademicYears,
    getAcademicYearById,
    updateAcademicYearById,
    deleteAcademicYearById,
    addClassesToAcademicYear
};
