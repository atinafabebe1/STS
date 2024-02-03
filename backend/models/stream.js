const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    name: { type: String, enum: ['General', 'Natural-Science', 'Social-Science'], required: true, unique: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;
