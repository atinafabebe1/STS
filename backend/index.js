require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const { getDb, connectToDb } = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user')
const studentRoutes = require('./routes/student')

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(cookieParser())
// Configure the Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'combined.log' })]
});

// Log requests
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request at ${req.originalUrl}`);
    next();
});

app.use(bodyParser.json());


// Register the route files
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

// Connect to the database
connectToDb((err) => {
    if (err) {
        logger.error('Failed to connect to the database:', err);
        process.exit(1);
    }

    const db = getDb();

    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to the API' });
    });

    const server = app.listen(port, () => {
        logger.info(`App listening on port ${port}`);
        logger.info('Connected to the database');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        logger.info('Received SIGTERM. Shutting down gracefully...');
        server.close(() => {
            logger.info('Server has closed.');
            process.exit(0);
        });
    });
});

app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});
