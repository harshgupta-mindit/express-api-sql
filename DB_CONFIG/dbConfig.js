// All configurationl credentials of server (MYSQL)

// NOTE:- to connect it with remote database, "PORT" needs
//        provide separatly.

module.exports = {
    HOST: '',
    PORT: "",
    USER: '',
    PASSWORD: '@',
    DB: '',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idel: 10000
    }
}