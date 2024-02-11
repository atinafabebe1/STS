const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: [true, 'subject is required'] },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: [true, 'student is required'] },
    semester: { type: String, enum: ['I', 'II'], required: [true, 'semester is required'] },
    marks: { type: Number, required: [true, 'marks is required'] },
    academicYear: { type: Number, required: [true, 'academic year is required'] }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
