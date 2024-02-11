const Grade = require('../models/grade');
const Student = require('../models/student');
const Stream = require('../models/stream');
const Transcript = require('../models/transcript');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

const getAllGrades = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});

const getGradeById = asyncHandler(async (req, res) => {
    const grade = await Grade.findById(req.params.id);
    res.json(grade);
});

const createGrade = asyncHandler(async (req, res, next) => {
    const { student, semester, academicYear, ...subjectsAndMarks } = req.body;

    try {
        const existingStudent = await Student.findById(student);
        if (!existingStudent) {
            return next(new ErrorResponse('This student is not registered', 400));
        }

        const stream = await Stream.findById(existingStudent.stream).populate('subjects');

        const invalidSubjects = Object.entries(subjectsAndMarks).filter(
            ([subject]) => !stream.subjects.some((subjectItem) => subjectItem._id.toString() === subject)
        );

        if (invalidSubjects.length > 0) {
            return next(new ErrorResponse("Some subjects do not exist in the student's stream", 400));
        }

        const existingGradeforStudent = await Grade.find({ semester, student, academicYear });

        if (existingGradeforStudent.length !== 0) {
            return next(new ErrorResponse("This Student's Grade has already been saved", 400));
        }

        const savedGrades = await Promise.all(
            Object.entries(subjectsAndMarks).map(async ([subject, marks]) => {
                const newGrade = new Grade({
                    subject,
                    student,
                    semester,
                    marks,
                    academicYear
                });

                return await newGrade.save();
            })
        );

        const transcript = await Transcript.findOne({ student, academicYear }).populate('grades');

        const totalMarks = savedGrades.reduce((sum, grade) => sum + grade.marks, 0);
        const average = totalMarks / savedGrades.length;

        if (transcript) {
            const totalGrades = [...savedGrades, ...transcript.grades];

            await Transcript.findByIdAndUpdate(transcript._id, {
                student,
                academicYear,
                grades: totalGrades.map((grade) => grade._id),
                totalMarks,
                average
            });
        } else {
            await Transcript.create({
                student,
                academicYear,
                grades: savedGrades.map((grade) => grade._id),
                totalMarks,
                average
            });
        }

        res.status(201).json(savedGrades);
    } catch (error) {
        return next(new ErrorResponse(error.message, 400));
    }
});

const updateGrade = asyncHandler(async (req, res) => {
    const updatedGrade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGrade);
});

const deleteGrade = asyncHandler(async (req, res) => {
    await Grade.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grade deleted successfully' });
});

module.exports = {
    getAllGrades,
    getGradeById,
    createGrade,
    updateGrade,
    deleteGrade
};
