const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    semester: { type: String, enum: ['I', 'II'], required: true },
    marks: { type: Number, required: true },
    academicYear: { type: Number, required: true }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
