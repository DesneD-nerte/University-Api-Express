const dotenv = require('dotenv');
dotenv.config();

const config = {
    connectionString: process.env.connectionString || "",
    port: process.env.port || 5000,
    user: "admin",
    password: "admin",
    secret: "SECRET_KEY_RANDOM"
}

export default config;
