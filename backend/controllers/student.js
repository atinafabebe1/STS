const Student = require('../models/student');

// Create a new student
const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json({ student });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json({ students });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get a student by ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        res.json({ student });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a student by ID
const updateStudentById = async (req, res) => {
    const allowedUpdates = ['fullName', 'age', 'stream', 'idNumber', 'gender', 'dateOfAdmission', 'dateOfLeaving'];
    const updates = req.body;
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ msg: 'Invalid updates!' });
    }

    try {
        const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        res.json({ student });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a student by ID
const deleteStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        res.json({ msg: 'Student deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
};
