const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    academicYear: { type: Number, required: true }, //TODO
    grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true }],
    totalMarks: { type: Number, required: true },
    average: { type: Number, required: true },
    rank: Number,
    conduct: String,
    dateOfGeneration: { type: Date, default: Date.now }
});

const Transcript = mongoose.model('Transcript', transcriptSchema);

module.exports = Transcript;
