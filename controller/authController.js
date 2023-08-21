const bcrypt = require('bcrypt');

const db = require("../model/index");
const Profile = db.profile;


// JOI for Data Integrity
const JOI = require('joi');

const { createToken } = require("../JWT.js")

const userLogin = async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const checkUser = await Profile.findOne({ where: { username: data.username } })

    if (checkUser === null) {
        res.status(500).json({
            message: "Can't log-in"
        });
    } else {

        // Load hash from your password DB.
        const passwordResult = await bcrypt.compare(data.password, checkUser.password);
        console.log("HASHED PASSWORD CEHCK : ", passwordResult);
        if (passwordResult) {

            const accessToken = createToken(checkUser);

            res.cookie("access-token", accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            res.status(200).json({
                message: "Logged in success",
                data
            });
        }
        else {
            res.status(200).json({
                message: "Password was incorrect",
                data
            });
        }
    }
}


const userRegister = async (req, res) => {


    const userData = JOI.object({
        username: JOI.string().alphanum().min(3).max(10).required(),
        password: JOI.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })

    const checkData = userData.validate({
        username: req.body.username,
        password: req.body.password
    })

    if (checkData.error) {
        res.json({
            error: "User have entered wrong input data",
            error_predicted: checkData.error.details[0].message,
            errorLog: checkData.error,
        });
    }

    else {
        const hashPassword = await bcrypt.hash(checkData.value.password, 10).then((hash) => {
            return hash;
        }).catch((err) => {
            console.log("PASSWORD HASH ERROR !!!", err);
        })

        checkData.value.hashPassword = hashPassword;

        const checkUser = await Profile.findOne({ where: { username: checkData.value.username } });

        console.log("CHECKUSER : ", checkUser)
        console.log("HASH-PASSWORD : ", checkData.value.hashPassword)


        if (checkUser === null) {
            await Profile.create({ username: checkData.value.username, password: checkData.value.hashPassword }).then(() => {
                console.log("USER REGISTERED SUCCESS");
                res.status(200).json({
                    message: "User Registered Success",
                    ...checkData.value
                });
            })
                .catch((err) => {
                    console.log("ERROR IN CREATING PROFILE : ", err);
                });
        } else {
            res.status(200).json({
                message: "User already exist"
            })
        }

    }




}


const getProfile = (req, res) => {
    res.status(200).send("Welcome to Profile");
}




const getUsers = async (req, res) => {

    const allProfiles = await Profile.findAll()

    res.status(200).json({
        allProfiles
    });
}


module.exports = {
    userLogin,
    userRegister,
    getProfile,
    getUsers
}