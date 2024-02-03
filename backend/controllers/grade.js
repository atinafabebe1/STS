const Grade = require('../models/grade');
const Student = require('../models/student')
const Stream = require('../models/stream')

const getAllGrades = async (req, res) => {
    res.status(200).json(res.advancedResults);
};

const getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        res.json(grade);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createGrade = async (req, res) => {
    const { subject, student, semester, marks } = req.body;

    try {
        // Check if the student exists
        const existingStudent = await Student.findById(student);
        if (!existingStudent) {
            return res.status(400).json({ error: "This student is not registered" });
        }

        const stream = await Stream.findById(existingStudent.stream).populate('subjects');
        const isSubjectInStream = stream.subjects.some(subjectItem => subjectItem._id.toString() === subject);

        if (!isSubjectInStream) {
            return res.status(400).json({ error: "This subject does not exist in the student's stream" });
        }

        const newGrade = new Grade({
            subject,
            student,
            semester,
            marks,
        });

        const savedGrade = await newGrade.save();
        res.status(201).json(savedGrade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateGrade = async (req, res) => {
    try {
        const updatedGrade = await Grade.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedGrade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteGrade = async (req, res) => {
    try {
        await Grade.findByIdAndDelete(req.params.id);
        res.json({ message: 'Grade deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllGrades,
    getGradeById,
    createGrade,
    updateGrade,
    deleteGrade,
};
