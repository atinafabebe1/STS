const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    gradeLevel: { type: String, required: [true, 'Grade level is required'], unique: true },
    section: [{ type: String }]
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
