// Import 2 methods of jwt
const {sign, verify} = require('jsonwebtoken');

// "db" consist of database schema and connectivity credentials
const db = require('./model/index');
// "Profile" schema getting from the "db"
const Profile = db.profile;



// ----------------------------------------------------------
// It will take the data from the params(which consist the data of the user from the controlller) and create a access token with that data
// and sign the document with the secret key, which will be returned 
const createToken = (user) => {
    // "sign" function will return the encrypted token which can only be decrypted with that particular string provided during the token creation
    // here that secret string is "harshgupta"
    const accessToken = sign(
        {username: user.username, password: user.password},
        "harshgupta" // secert token string for encryption and decryption
    )

    // return the encrypted token to the controller.
    return accessToken;
}
// -----------------------------------------------------------





// -----------------------------------------------------------
// This will decode the secret token which given by the client and check the if the user token is valid or not.
// Note: the token is stored in the cookies.
const validateToken = async (req, res, next) => {
    // get the cookie from the browser and then check with some parameter.
    // "access-token" is key by which the token can be differentiated.
    const accessToken = req.cookies["access-token"];
    console.log("INSIDE VALIDTOKEN FUNC!!!");

    // check if the access token present or not.
    if(!accessToken){
        console.log("IF CONDITION RUNNED!!!");
        return res.status(400).json({message: "User not authenticated!"})
    }else{
        console.log("ELSE CONDITION RUNNED!!!");
        try{
            // decode the access token with secret string
            const validate = verify(accessToken, "harshgupta");
            console.log("INSIDE VALIDATE FUNC : ", validate);

            // try catch is implemented so that if verify method throw any error than it can be catched.
            // Note: reason to throw error could be, decoding the invalid cookie or altered cookies(which
            // can not be decryptes.) 
            try{
                if(validate){
                    const userInfo = await Profile.findOne({where:{username: validate.username}});
                    console.log(userInfo.dataValues.password, validate);
                    if(userInfo.dataValues.password == validate.password){
                        req.authenticated = true;
                        return next();
                    }
                }
            }catch(err){
                return res.status(400).json({
                    ErrorMesssage : "Not allowed"
                });
            }
        }
        catch(err){
            res.status(200).json({
                message: "error in validating token",
                prediction: "Malfunctioned token",
                errorMesssage: err
            });
        }
        // -----------------------------------------------------------
        
    }
}

module.exports = {
    createToken,
    validateToken
};