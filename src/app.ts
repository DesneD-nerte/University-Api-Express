import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import fileUpload from "express-fileupload";
import createSocket from "./core/socket";
import config from "./config/config";
import errorMiddleware from "./middlewares/errorMiddleware";
import createRoutes from "./core/routes";
import * as path from "path";

import compression from "compression";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./openapi.yaml");

const app = express();
const httpServer = http.createServer(app);
const io = createSocket(httpServer);

app.use(
	cors({
		exposedHeaders: "range",
	})
);

app.use(fileUpload({}));

app.use("/images", express.static(path.join(__dirname, "images", "loginPage")));

app.use(express.json());

createRoutes(app);

app.use(compression());
app.use("/api-docs/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(config.connectionString);
		httpServer.listen(config.port, () => console.log(`server started on ${config.port} port`));
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.message);
		}
	}
};

start();
