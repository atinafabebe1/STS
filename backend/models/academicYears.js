const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema({
    year: { type: String, required: [true, 'year level is required'], unique: true },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);

module.exports = AcademicYear;
