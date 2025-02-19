require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ClientModel = require('./models/Client');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.post('/signup', (req, res) => {
    ClientModel.create(req.body)
        .then((clients) => res.json(clients))
        .catch((err) => {
            console.error('Error creating client:', err);
            res.status(500).json({ error: 'Failed to create client' });
        });
});

app.listen(3001, () => {
    console.log('server is running');
});
