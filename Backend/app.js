const express = require('express');
const { connectDB, getDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const telegramRoutes = require('./routes/telegram');
const userRoutes = require('./routes/user');
const webhook = require('./routes/webhook');
const { deleteExpiredCodes } = require('./config/firebaseConfig');
const cors = require('cors');

require('dotenv').config();

const INTERVAL = 5 * 60 * 1000; 
const app = express();

app.use('/api/webhook', webhook);
app.use(express.json());

app.use(cors({
  origin: `${process.env.CORS_URL}`, 
  credentials: true,
}));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/telegram', telegramRoutes);
app.use('/api/user', userRoutes);


setInterval(deleteExpiredCodes, INTERVAL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on Port: ${PORT}`)
);

module.exports = app;
