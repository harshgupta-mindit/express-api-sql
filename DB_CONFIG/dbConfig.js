// All configurationl credentials of server (MYSQL)

// NOTE:- to connect it with remote database, "PORT" needs
//        provide separatly.

module.exports = {
    HOST: '103.178.248.62',
    PORT: "3306",
    USER: 'mindit_dev',
    PASSWORD: 'Password@1234',
    DB: 'db_harshguptatraining',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idel: 10000
    }
}