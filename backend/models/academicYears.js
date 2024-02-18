const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema({
    year: { type: String, required: [true, 'Year is required'], unique: true },
    classes: [
        {
            gradeLevel: { type: String, required: [true, 'Grade level is required'] },
            sections: [{ type: String, required: [true, 'Sections are required'] }]
        }
    ]
});

const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);

module.exports = AcademicYear;
