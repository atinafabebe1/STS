const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], unique: true }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
