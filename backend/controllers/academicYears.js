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
    const isValidOperation = Object.keys(updates).every((update) => allowedUpdates.includes(update));

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
const addClassesToAcademicYear = asyncHandler(async (req, res, next) => {
    const { academicYear, gradeLevels, sections } = req.body;

    const selectedGradeLevels = await Classes.find({ gradeLevel: { $in: gradeLevels } });

    console.log(selectedGradeLevels)

    if (gradeLevels.length !== selectedGradeLevels.length) {
        return next(new ErrorResponse("Some grade levels don't exist in the database. Please use only the dropdown values!", 404));
    }
    const prevAcademicYear = await AcademicYear.findOne({ year: academicYear })
    if (prevAcademicYear) {
        return next(new ErrorResponse("You have already saved saved this acadmic year", 404));
    }
    const classesData = gradeLevels.map((level) => ({
        gradeLevel: level,
        sections: sections[level] || [],
    }));
    console.log(classesData)

    const newAcademicYear = await AcademicYear.create({
        year: academicYear,
        classes: classesData
    });

    res.status(200).json({ message: 'Academic Year saved successfully', newAcademicYear });
});

module.exports = {
    createAcademicYear,
    getAllAcademicYears,
    getAcademicYearById,
    updateAcademicYearById,
    deleteAcademicYearById,
    addClassesToAcademicYear
};
