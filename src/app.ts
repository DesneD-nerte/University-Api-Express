import express, { Application } from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import createSocket from "./core/socket";
import config from './config/config'
import errorMiddleware from './middlewares/errorMiddleware';
import createRoutes from "./core/routes";

require('./models/Faculty');
require('./models/Department');
require('./models/Group');
require('./models/Audience');
require('./models/CurrentLessons');
require('./models/Lesson');


const app = express();
const httpServer = require('http').createServer(app);
const io = createSocket(httpServer);

app.use(cors({
    exposedHeaders: 'range'
}));

const fileUpload = require('express-fileupload');
app.use(fileUpload({}));

app.use(express.json());;

createRoutes(app);

app.use(errorMiddleware);


const start = async () => { 
    try {
        await mongoose.connect(config.connectionString);
        httpServer.listen(config.port, () => console.log(`server started on ${config.port} port`));
    } catch(err) {
        if(err instanceof Error) {
            console.log(err.message);
        }
    }
}

start();
