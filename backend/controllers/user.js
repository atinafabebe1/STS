const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Controller for user registration
const registerController = async (req, res) => {
    const { username, role, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, role, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller for user login
const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller for user logout
const logoutController = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

// Controller for password reset
const forgotPasswordController = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOneAndUpdate({ username }, { password: hashedPassword });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    registerController,
    loginController,
    logoutController,
    forgotPasswordController,
};