const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Section is required']
    },
    age: {
        type: Number,
        required: [true, 'Section is required']
    },
    stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stream',
        required: [true, 'Section is required']
    },
    section: {
        type: String,
        required: [true, 'Section is required']
    },
    idNumber: {
        type: String,
        required: [true, 'Section is required'],
        unique: {
            value: true,
            message: 'The provided idNumber is already in use.'
        }
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: [true, 'Section is required']
    },
    dateOfAdmission: {
        type: Date,
        required: [true, 'Section is required']
    },
    dateOfLeaving: Date
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
