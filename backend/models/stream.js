const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], unique: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

streamSchema.path('subjects').validate(async function (value) {
    const uniqueSubjectIds = new Set(value.map(subject => subject.toString()));
    return uniqueSubjectIds.size === value.length;
}, 'Subjects must be unique.');

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;
