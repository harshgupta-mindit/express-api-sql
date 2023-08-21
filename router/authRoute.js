const express = require("express");
const app = express();

const {validateToken} = require("../JWT");

const AuthController = require('../controller/authController');
const UsersController = require('../controller/authController');

app.get('/login', AuthController.userLogin);
app.post('/register', AuthController.userRegister);
app.get('/profile', validateToken, AuthController.getProfile);

app.get("/getProfiles", UsersController.getUsers);


module.exports = app;