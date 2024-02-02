const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.user;

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
        }

        next();
    };
};

module.exports = {
    authenticate,
    authorize,
};
