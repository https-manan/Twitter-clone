const express = require('express');
const { register,login, logout, getMyProfile,bookmark, getOtherUsers } = require('../controllers/userController');
const isAuthenticated = require('../config/auth');
const route = express.Router();


route.post('/register',register)
route.post('/login', login);
route.post('/logout', logout);
route.put('/bookmark/:id',isAuthenticated,bookmark);
route.get('/getMyProfile/:id',isAuthenticated,getMyProfile)
route.get('/otherUsers/:id',isAuthenticated,getOtherUsers)


module.exports = route;