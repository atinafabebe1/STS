const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Fullname is required']
    },
    age: {
        type: Number,
        required: [true, 'age is required']
    },
    stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stream',
        required: [true, 'stream is required']
    },
    gradeLevel: {
        type: String,
        required: [true, 'grade level is required'],
    },
    section: {
        type: String,
        required: [true, 'Section is required']
    },
    idNumber: {
        type: String,
        required: [true, 'id number is required'],
        unique: {
            value: true,
            message: 'The provided idNumber is already in use.'
        }
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: [true, 'gender is required']
    },
    dateOfAdmission: {
        type: Date,
        required: [true, 'Date of Admission is required']
    },
    dateOfLeaving: Date
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
