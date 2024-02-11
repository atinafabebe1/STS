const asyncHandler = require('../middlewares/async');
const Student = require('../models/student');
const Stream = require('../models/stream');
const ErrorResponse = require('../utils/errorResponse');

// Create a new student
const createStudent = asyncHandler(async (req, res) => {
    console.log(req.body);
    const stream = await Stream.findOne({ name: req.body.stream });

    if (!stream) {
        return next(new ErrorResponse('Stream not found', 400));
    }

    req.body.stream = stream._id;
    const student = new Student(req.body);
    await student.save();
    res.json({ student });
});

// Get all students
const getAllStudents = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});

// Get a student by ID
const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (!student) {
        return next(new ErrorResponse('Student not found', 404));
    }

    res.json({ student });
});

// Update a student by ID
const updateStudentById = asyncHandler(async (req, res) => {
    const allowedUpdates = ['fullName', 'age', 'stream', 'idNumber', 'gender', 'dateOfAdmission', 'dateOfLeaving'];
    const updates = req.body;
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return next(new ErrorResponse('Invalid updates', 400));
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    if (!student) {
        return next(new ErrorResponse('Student not found', 404));
    }

    res.json({ student });
});

// Delete a student by ID
const deleteStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
        return next(new ErrorResponse('Student not found', 404));
    }

    res.json({ msg: 'Student deleted' });
});

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
};
