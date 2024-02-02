const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream', required: true },
    idNumber: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F'], required: true },
    dateOfAdmission: { type: Date, required: true },
    dateOfLeaving: Date
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
