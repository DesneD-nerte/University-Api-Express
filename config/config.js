const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    connectionString: process.env.connectionString,
    port: process.env.port,
    user: "admin",
    password: "admin",
    secret: "SECRET_KEY_RANDOM"
}