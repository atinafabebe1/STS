const Grade = require('../models/grade');
const Student = require('../models/student')
const Stream = require('../models/stream')
const Transcript = require('../models/transcript')

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
    const { student, semester, academicYear, ...subjectsAndMarks } = req.body;
    console.log(subjectsAndMarks);

    try {
        const existingStudent = await Student.findById(student);
        if (!existingStudent) {
            return res.status(400).json({ error: "This student is not registered" });
        }

        const stream = await Stream.findById(existingStudent.stream).populate('subjects');
        console.log(subjectsAndMarks);

        const invalidSubjects = Object.entries(subjectsAndMarks).filter(([subject]) => !stream.subjects.some(subjectItem => subjectItem._id.toString() === subject));

        if (invalidSubjects.length > 0) {
            return res.status(400).json({ error: "Some subjects do not exist in the student's stream" });
        }

        const savedGrades = await Promise.all(Object.entries(subjectsAndMarks).map(async ([subject, marks]) => {
            const newGrade = new Grade({
                subject,
                student,
                semester,
                marks,
                academicYear
            });

            return await newGrade.save();
        }));

        const transcript = await Transcript.findOne({ student, academicYear }).populate('grades');


        const totalMarks = savedGrades.reduce((sum, grade) => sum + grade.marks, 0);
        const average = totalMarks / savedGrades.length;

        if (transcript) {
            const totalGrades = [...savedGrades, ...transcript.grades];

            const newn = await Transcript.findByIdAndUpdate(transcript._id, {
                student,
                academicYear,
                grades: totalGrades.map(grade => grade._id),
                totalMarks,
                average
            });

            console.log(newn)

        } else {
            await Transcript.create({
                student,
                academicYear,
                grades: savedGrades.map(grade => grade._id),
                totalMarks,
                average
            });
        }

        res.status(201).json(savedGrades);
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
