const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const workoutRoutes = require('./src/routes/workoutRoutes');
const connectDB = require('./config');
const app = express();

// middleware
app.use(express.json());

// koneksi database
connectDB();

// rute
app.use('/api/auth', authRoutes);
app.use('/api', workoutRoutes);

module.exports = app;
