import dotenv from "dotenv";
dotenv.config();

let hostValue;
if (process.env.NODE_ENV === "development") {
	hostValue = `http://localhost:${process.env.port || 5000}`;
}
if (process.env.NODE_ENV === "production") {
	hostValue = "https://api.stu-training.ru";
}

const config = {
	connectionString: process.env.connectionString || "",
	port: process.env.port || 5000,
	host: hostValue,
	user: "admin",
	password: "admin",
	secret: "SECRET_KEY_RANDOM",
};

export default config;
