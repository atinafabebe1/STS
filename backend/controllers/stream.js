const asyncHandler = require('../middlewares/async');
const Stream = require('../models/stream');
const Subject = require('../models/subject');
const ErrorResponse = require('../utils/errorResponse');

// Create a new stream
const createStream = asyncHandler(async (req, res) => {
    const stream = new Stream(req.body);
    await stream.save();
    res.json({ stream });
});

// Get all streams
const getAllStreams = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});

// Get a stream by ID
const getStreamById = asyncHandler(async (req, res) => {
    const stream = await Stream.findById(req.params.id);

    if (!stream) {
        return next(new ErrorResponse('Stream not found', 404));
    }

    res.json({ stream });
});

// Update a stream by ID
const updateStreamById = asyncHandler(async (req, res) => {
    const allowedUpdates = ['name'];
    const updates = req.body;
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return next(new ErrorResponse('Invalid updates!', 400));
    }

    const stream = await Stream.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    if (!stream) {
        return next(new ErrorResponse('Stream not found!', 404));
    }

    res.json({ stream });
});

// Delete a stream by ID
const deleteStreamById = asyncHandler(async (req, res) => {
    const stream = await Stream.findByIdAndDelete(req.params.id);

    if (!stream) {
        return next(new ErrorResponse('Stream not found!', 404));
    }

    res.json({ msg: 'Stream deleted' });
});

// Add subjects to a stream
const addSubjectToStream = asyncHandler(async (req, res) => {
    const { streamId, name } = req.body;

    // Find stream by ID
    const stream = await Stream.findById(streamId);
    if (!stream) {
        return next(new ErrorResponse('Stream not found', 404));
    }

    const subjects = await Subject.find({ name: { $in: name } });

    if (subjects.length === 0) {
        return next(new ErrorResponse('Subjects not found', 404));
    }

    stream.subjects?.push(...subjects.map(subject => subject._id));

    await stream.save();

    res.status(200).json({ message: 'Subjects added to stream successfully', stream });
});

module.exports = {
    createStream,
    getAllStreams,
    getStreamById,
    updateStreamById,
    deleteStreamById,
    addSubjectToStream
};
