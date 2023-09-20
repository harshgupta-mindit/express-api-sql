const db = require("../model/index");

const Profile = db.profile;

const getUsers = async (req, res) => {
    const allProfiles = []; 
    
    await Profile.findAll().then((data)=> {
        allProfiles= data;
    }).catch((e)=> {
        res.send("Error in fetching data!!");
    });
    res.status(200).json({
        ...allProfiles
    });
}   


const deleteProfile = async (req, res) => {
    await Profile.destroy()
}

module.exports = {
    getUsers
}