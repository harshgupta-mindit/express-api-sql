// Express app initialization
const express = require('express');
const app = express();

// Middleware to store and handle cookies within API
const cookieParser = require("cookie-parser");


// ROUTES CONTROLLER CONSIST DEFINITION OF ROUTES --  /login  /register  /profile  /getProfiles
const AuthRoute = require("./router/authRoute");


// DYNAMIC PORT
const PORT = process.env.PORT || 3002;


// MIDDLEWARE INITIALIZATION
app.use(express.json());
app.use(cookieParser());


// Calling all routing associated with it.
app.use(AuthRoute);


// HOME ROUTE ---- "/"
app.get('/', (req, res) => {
    res.send("HOME ROUTE")
})


// LIVE SERVER LISTENING PORT
app.listen(PORT, () => {
    console.log("Server is running !!!");
})


// ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})