require('dotenv').config();

module.exports = {

    database: {
        host: process.env.db_host || 'localhost',
        user: process.env.db_user || 'root',
        port: process.env.db_port || 8080,
        password: process.env.db_password || 'root123',
        database: process.env.db_database || 'db_animals_garden'
    }

};