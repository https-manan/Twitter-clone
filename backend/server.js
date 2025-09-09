require('dotenv').config();
const express = require('express');
const dbConnection = require('./db/connection');
const userRoutes = require('./routes/userRoute');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8080;

dbConnection();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());   // <-- FIXED
app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Working" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
