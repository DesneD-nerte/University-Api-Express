import express, {Application} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import userController from "./controllers/userController";
import fileController from "./controllers/fileController";
import UserRepository from "./repositories/userRepository";
import { Message } from "./types";
import MessagesRepository from "./repositories/messagesRepository";
import * as ios from 'socket.io';
require('./models/Faculty');
require('./models/Department');
require('./models/Group');
require('./models/Audience');
require('./models/CurrentLessons');
require('./models/Lesson');


const config = require('./config/config');

//const formData = require('express-form-data');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const newsRoutes = require('./routes/newsRoutes');
const currentLessonRoutes = require('./routes/currentLessonRoutes');
const markRoutes = require('./routes/markRoutes');

const lessonRoutes = require('./routes/additionalRoutes.ts/lessonRoutes');
const audienceRoutes = require('./routes/additionalRoutes.ts/audienceRoutes');
const departmentRoutes = require('./routes/additionalRoutes.ts/departmentRoutes');
const facultyRoutes = require('./routes/additionalRoutes.ts/facultyRoutes');
const groupRoutes = require('./routes/additionalRoutes.ts/groupRoutes');
const roleRoutes = require('./routes/additionalRoutes.ts/roleRoutes');


const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');


const app: Application = express();
const httpServer = require('http').createServer(app);
const { Server } = require("socket.io");
var io: ios.Server = new Server(httpServer);
global.io = io;

type connectedUsersType = {
    [key: string]: string
}
var connectedUsers: connectedUsersType = {};


io.on('connection', (socket: any) => {
    console.log('a user connected ' + socket.id);

    socket.on('logged-in', (myId: string) => {
        connectedUsers[myId] = socket.id;

        global.connectedUsers = connectedUsers;
    })

    socket.on('sendMessage', (result: any) => {
        console.log('sendMessage server');
        console.log(connectedUsers);
        const {content, createdAt, user, isVisible} = result.message;
        const mainMessage = {content, createdAt, user, isVisible};

        MessagesRepository.addMessage(result.message.user._id, result.receiverId, mainMessage)
        .then(resRepos => {
           io.to(connectedUsers[result.message.user._id]).emit('updateMessages');
           io.to(connectedUsers[result.receiverId]).emit('updateMessages');
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



const corsOptions = {
    origin: ["http://localhost:3000",
    "http://localhost:19006",
    "http://localhost"],
    optionsSuccessStatus: 200
}

//app.use(cors(corsOptions));
app.use(cors());

const fileUpload = require('express-fileupload');
app.use(fileUpload({}));

//app.use(formData.parse());

app.use(express.json());;

//app.use('/', authMiddleware);

//app.use('/api/lessons', authMiddleware, lessonRoutes);
app.use('/api/currentlessons', authMiddleware, currentLessonRoutes);
app.use('/api/marks', authMiddleware, markRoutes);

app.use('/api/lessons', lessonRoutes);
app.use('/api/audiences', audienceRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/faculties', facultyRoutes);

app.use('/api/users', userRoutes);//аватарки тут
//app.use('/api/users/:username', authMiddleware, userRoutes);//Пока что я могу просматривать только себя, я использую свой токен чтобы узнать как меня зовут
app.use('/myprofile', authMiddleware, userController.GetMyData)//Что если вместо верхнего, используем не публичный api, а тот который для каждого будет свой 

app.use('/api/auth', authRoutes);

app.use('/messages', authMiddleware, messageRoutes);

app.use('/news', authMiddleware, newsRoutes);

app.get('/files/getExcelTemplate', authMiddleware, fileController.LoadExcelTemplate);

app.get('/images/:imageName', fileController.LoadLoginImages);

app.post('/upload', fileController.SaveImage);

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
