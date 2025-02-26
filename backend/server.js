require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const ClientModel = require('./models/Client');

const app = express();
app.use(express.json());
app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

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

// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
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

app.post('/orders', verifyToken, upload.single('file'), async (req, res) => {
    try {
        const user = await ClientModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Received order data:', req.body);

        const orderData = {
            user: req.userId,
            orderType: req.body.orderType,
            academicLevel: req.body.academicLevel,
            writingLevel: req.body.writingLevel,
            course: req.body.course,
            service: req.body.service,
            spacing: req.body.spacing,
            title: req.body.title,
            description: req.body.description,
            deadline: new Date(req.body.deadline),
            price: Number(req.body.price),
            amount: Number(req.body.amount) || 1,
            fileUrl: req.file ? req.file.path : undefined
        };

        const order = new Order(orderData);
        await order.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully'
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order: ' + error.message
        });
    }
});

app.get('/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).sort({
            createdAt: -1
        });
        res.json(orders);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
