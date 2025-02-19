require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const ClientModel = require('./models/Client');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const validateSignup = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().isLength({ min: 2 })
];

const validateLogin = [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
];

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

app.post('/signup', validateSignup, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = req.body;

        //checking for existing user
        const existingUser = await ClientModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // hashing password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // created a new user
        const newUser = await ClientModel.create({
            name,
            email,
            password: hashedPassword
        });

        // created token
        const token = createToken(newUser._id);

        res.status(201).json({
            message: 'User created successfully',
            token
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error during signup' });
    }
});

app.post('/login', validateLogin, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // finding a user
        const user = await ClientModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        //create token
        const token = createToken(user._id);

        res.json({
            message: 'Login Successful',
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
