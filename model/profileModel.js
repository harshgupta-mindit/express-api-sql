module.exports = (Sequelize, DataTypes) => {
    const Profile = Sequelize.define('profile', {
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        }
    })

    return Profile;
}