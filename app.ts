import express, {Application} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import userController from "./controllers/userController";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "./types";

const config = require('./config/config');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');

const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');


const app: Application = express();
const httpServer = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);

io.on('connection', (socket: any) => {
    console.log('a user connected');
});
//const ioe = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

const corsOptions = {
    origin: ["http://localhost:3000",
    "http://localhost:19006",
    "http://localhost"],
    optionsSuccessStatus: 200
}


app.use(express.json());
//app.use(cors(corsOptions));
app.use(cors());

//app.use('/', authMiddleware);
app.use('/api/lessons', authMiddleware, lessonRoutes);
app.use('/api/users', authMiddleware, userRoutes);
//app.use('/api/users/:username', authMiddleware, userRoutes);//Пока что я могу просматривать только себя, я использую свой токен чтобы узнать как меня зовут
app.use('/myprofile', authMiddleware, userController.getMyData)//Что если вместо верхнего, используем не публичный api, а тот который для каждого будет свой 

app.use('/api/auth', authRoutes);
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