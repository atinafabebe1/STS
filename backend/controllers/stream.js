const Stream = require('../models/stream');
const Subject = require('../models/subject')

// Create a new stream
const createStream = async (req, res) => {
    try {
        const stream = new Stream(req.body);
        await stream.save();
        res.json({ stream });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get all streams
const getAllStreams = async (req, res) => {
    res.status(200).json(res.advancedResults);
};

// Get a stream by ID
const getStreamById = async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id);

        if (!stream) {
            return res.status(404).json({ msg: 'Stream not found' });
        }

        res.json({ stream });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a stream by ID
const updateStreamById = async (req, res) => {
    const allowedUpdates = ['name'];
    const updates = req.body;
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ msg: 'Invalid updates!' });
    }

    try {
        const stream = await Stream.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if (!stream) {
            return res.status(404).json({ msg: 'Stream not found' });
        }

        res.json({ stream });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a stream by ID
const deleteStreamById = async (req, res) => {
    try {
        const stream = await Stream.findByIdAndDelete(req.params.id);

        if (!stream) {
            return res.status(404).json({ msg: 'Stream not found' });
        }

        res.json({ msg: 'Stream deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const addSubjectToStream = async (req, res) => {
    try {
        const { streamId, name } = req.body;

        // Find stream by ID
        const stream = await Stream.findById(streamId);
        if (!stream) {
            return res.status(404).json({ message: 'Stream not found' });
        }

        const subjects = await Subject.find({ name: { $in: name } });

        console.log(subjects)
        if (subjects.length === 0) {
            return res.status(404).json({ message: 'Subjects not found' });
        }

        stream.subjects?.push(...subjects.map(subject => subject._id));

        await stream.save();

        res.status(200).json({ message: 'Subjects added to stream successfully', stream });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createStream,
    getAllStreams,
    getStreamById,
    updateStreamById,
    deleteStreamById,
    addSubjectToStream
};
