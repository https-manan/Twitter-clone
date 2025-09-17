require('dotenv').config();
const express = require('express');
const dbConnection = require('./db/connection');
const userRoutes = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const tweetRoute = require('./routes/tweetRoute')
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');


dbConnection();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());   
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true // CRITICAL for cookies!
}));

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tweet', tweetRoute);




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
