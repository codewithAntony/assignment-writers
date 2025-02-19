require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// app.post('/login', (req, res) => {

// })

app.listen(3001, () => {
    console.log('server is running');
});
