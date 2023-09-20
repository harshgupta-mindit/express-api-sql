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


// Database reference to store and manage the complete api with sequelize and database
const db = {};
// Passing instance of "Sequelize"
db.Sequelize = Sequelize;
// Passing the database credentials 
db.sequelize= sequelize;



// Passing the "sequelize" and "DataTypes" for creating schema for profile table
db.profile = require("./profileModel")(sequelize, DataTypes);



// This method has no effect on the database since the "force: false" doesn't do
// anything with the database table

// but if it becomes "force: true" then it will drop the table first then create
//  the table according to the schema we provided.
db.sequelize.sync({force: false}).then(()=> {
    console.log("DB ----- reSync Done ---------");
}).catch((err)=> {
    console.log("DB RESYNC ERROR : ", err);
})



// Exporting all feature of data which is going to be used for CRUD in 
// controllers.
module.exports = db;