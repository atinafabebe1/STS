const mongoose = require('mongoose');

let dbConnection;

module.exports = {
    connectToDb: async (cb) => {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 30000,
                connectTimeoutMS: 30000
            });

            dbConnection = mongoose.connection;
            console.log('Connected to MongoDB');
            cb();
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            cb(err);
        }
    },
    getDb: () => dbConnection
};
