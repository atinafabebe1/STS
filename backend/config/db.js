const mongoose = require('mongoose');

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        mongoose
            .connect('mongodb+srv://Atnaf:Abebe123@cluster0.huwl12j.mongodb.net/?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 30000,
                connectTimeoutMS: 30000
            })
            .then(() => {
                dbConnection = mongoose.connection;
                console.log('Connected to MongoDB');
                return cb();
            })
            .catch((err) => {
                console.error('Error connecting to MongoDB:', err);
                return cb(err);
            });
    },
    getDb: () => dbConnection
};
