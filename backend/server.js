const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const { profile } = require('console');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const app = express();
app.arguments(cors());
app.arguments(express.json());

mongoose.connect('mongodb://localhost:27017/auth_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    googleId: String
});

const User = mongoose.model('User', userSchema);

passport.use(
    new GoogleStrategy(
        {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value
                });
                await user.save();
            }
            done(null, user);
        }
    )
);

app.use(passport.initialize());

app.post(
    '/api/login',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ success: false, errors: errors.array() });
        }

        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res
                    .status(401)
                    .json({ success: false, message: 'Invalid Credentials' });
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET
            );
            res.json({ success: true, token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
);

const verifyGoogleToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        return ticket.getPayload();
    } catch (error) {
        console.error('Error verifying Google token:', error);
        return null;
    }
};

app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);

    if (!payload) {
        return res
            .status(401)
            .json({ success: false, message: 'Invalid Google Token' });
    }

    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
        user = new User({
            googleId: payload.sub,
            username: payload.name,
            email: payload.email
        });
        await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token: jwtToken });
});

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
