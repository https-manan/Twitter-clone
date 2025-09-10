const express = require('express');
const { createTweet, deleteTweet, likeOrDislike, bookmark } = require('../controllers/tweetController');
const route = express.Router();
const isAuthenticated = require('../config/auth')

route.post('/create',isAuthenticated,createTweet);
route.delete('/delete/:id',isAuthenticated,deleteTweet);
route.put('/like/:id',isAuthenticated,likeOrDislike)


module.exports = route