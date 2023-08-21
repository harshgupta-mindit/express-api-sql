// Import credential define in the file.
const dbConfig = require("../DB_CONFIG/dbConfig");

// "Sequelize" Initialize with "Datatypes"
const { Sequelize, DataTypes } = require("sequelize");


// Connecting Database with the help of Sequelize "dbConfig" is 
// imported from the file mentioned top of the code.
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)


// to test the connection from Database
sequelize.authenticate().then(() => {
    console.log("DB AUTH SUCCESS");
}).catch((err) => {
    console.log("DB AUTH PROBLEM : ", err)
})



const db = {};

db.Sequelize = Sequelize;
db.sequelize= sequelize;


// Passing the "sequelize" and "DataTypes" for creating schema for profile table
db.profile = require("./profileModel")(sequelize, DataTypes);


db.sequelize.sync({force: false}).then(()=> {
    console.log("DB ----- reSync Done ---------");
}).catch((err)=> {
    console.log("DB RESYNC ERROR : ", err);
})



// Exporting all feature of data which is going to be used for CRUD in 
// controllers.
module.exports = db;