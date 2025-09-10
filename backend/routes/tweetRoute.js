const express = require('express');
const { createTweet, deleteTweet } = require('../controllers/tweetController');
const route = express.Router();
const isAuthenticated = require('../config/auth')

route.post('/create',isAuthenticated,createTweet);
route.delete('/delete/:id',isAuthenticated,deleteTweet);

module.exports = route