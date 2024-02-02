const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;
