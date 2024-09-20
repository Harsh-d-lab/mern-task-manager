const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes placeholder
app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err));
