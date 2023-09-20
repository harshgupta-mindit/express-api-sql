// Initialize express to define route
const express = require("express");
const app = express();

// JWT token function
const {validateToken} = require("../JWT");

// Controller consist all the function with all the logic(CRUD) inside them.
// All Route related to Auth
const AuthController = require('../controller/authController');
// All Route related to user
const UsersController = require('../controller/authController');

// Calling all the route with naming and controller function
app.get('/login', AuthController.userLogin);
app.post('/register', AuthController.userRegister);
app.get('/profile', validateToken, AuthController.getProfile);

// Calling the single profile route to get list of the data.
app.get("/getProfiles", UsersController.getUsers);

// Exporting app which consist all the route.
module.exports = app;