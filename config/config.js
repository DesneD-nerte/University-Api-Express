const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    connectionString: "mongodb+srv://admin:admin@cluster0.jpggl.mongodb.net/db_thesis?retryWrites=true&w=majority",
    port: process.env.port,
    user: "admin",
    password: "admin",
    secret: "SECRET_KEY_RANDOM"
}