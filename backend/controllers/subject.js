const Subject = require('../models/subject');

// Create a new subject
const createSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.json({ subject });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
    res.status(200).json(res.advancedResults);
};

// Get a subject by ID
const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);

        if (!subject) {
            return res.status(404).json({ msg: 'Subject not found' });
        }

        res.json({ subject });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a subject by ID
const updateSubjectById = async (req, res) => {
    const allowedUpdates = ['name'];
    const updates = req.body;
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ msg: 'Invalid updates!' });
    }

    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if (!subject) {
            return res.status(404).json({ msg: 'Subject not found' });
        }

        res.json({ subject });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a subject by ID
const deleteSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);

        if (!subject) {
            return res.status(404).json({ msg: 'Subject not found' });
        }

        res.json({ msg: 'Subject deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubjectById,
    deleteSubjectById
};
