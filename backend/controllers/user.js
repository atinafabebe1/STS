const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

const registerController = asyncHandler(async (req, res) => {
    const { username, role, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, role, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
});

const loginController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
        // sameSite: 'none',
        // secure: true,
        // domain: '.vercel.app',
    });

    res.status(200).json({ message: 'Login successful' });
});

const logoutController = asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

const currentUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;
        const role = decoded.role;

        res.status(200).json({ username, role });
    } catch (error) {
        return next(new ErrorResponse('Unauthorized', 401));
    }
});

const forgotPasswordController = asyncHandler(async (req, res) => {
    const { username, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate({ username }, { password: hashedPassword });

    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({ message: 'Password reset successful' });
});

module.exports = {
    registerController,
    loginController,
    logoutController,
    forgotPasswordController,
    currentUser,
};
