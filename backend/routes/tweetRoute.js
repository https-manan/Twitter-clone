const express = require('express');
const { createTweet, deleteTweet, likeOrDislike, getAllTweets, getFollowingTweets } = require('../controllers/tweetController');
const route = express.Router();
const isAuthenticated = require('../config/auth')

route.post('/create',isAuthenticated,createTweet);
route.delete('/delete/:id',isAuthenticated,deleteTweet);
route.put('/like/:id',isAuthenticated,likeOrDislike)
route.get('/getAllTweets',isAuthenticated,getAllTweets)
route.get('/getFollowingTweets',isAuthenticated,getFollowingTweets)



module.exports = route