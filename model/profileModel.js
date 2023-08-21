// "Sequelize" and "DataTypes" are passed from "index" model.

// Its complete schemna defined for Database, with specific parameters 
// which needs to be fullfilled in order to save data in database.
module.exports = (Sequelize, DataTypes) => {
    const Profile = Sequelize.define('profile', {
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        }
    })


    // Return this "Profile" so that it can save in "db.profile".
    return Profile;
}