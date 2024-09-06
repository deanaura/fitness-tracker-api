const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const workoutRoutes = require('./src/routes/workoutRoutes');
const goalRoutes = require('./src/routes/goalRoutes');
const connectDB = require('./config');
const app = express();

// middleware
app.use(express.json());

// koneksi database
connectDB();

// rute
app.use('/api', authRoutes);
app.use('/api', workoutRoutes);
app.use('/api', goalRoutes);

module.exports = app;
