const {sign, verify} = require('jsonwebtoken');

const db = require('./model/index');
const Profile = db.profile;


const createToken = (user) => {
    const accessToken = sign(
        {
            username: user.username, password: user.password
        },
        "harshgupta"
    )
    return accessToken;
}


const validateToken = async (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    console.log("INSIDE VALIDTOKEN FUNC!!!");

    if(!accessToken){
        console.log("IF CONDITION RUNNED!!!");
        return res.status(400).json({message: "User not authenticated!"})
    }else{
        console.log("ELSE CONDITION RUNNED!!!");
        try{
            const validate = verify(accessToken, "harshgupta");
            console.log("INSIDE VALIDATE FUNC : ", validate);
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

    }
}

module.exports = {
    createToken,
    validateToken
};