import express, {Application} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import userController from "./controllers/userController";
import fileController from "./controllers/fileController";

const config = require('./config/config');

//const formData = require('express-form-data');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const messageRoutes = require('./routes/messageRoutes');
const newsRoutes = require('./routes/newsRoutes');

const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');


const app: Application = express();
const httpServer = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);


// получаем обработчики событий
//const registerMessageHandlers = require('./services/messageHandlers')
//const registerUserHandlers = require('./services/userHandlers')

io.on('connection', (socket: any) => {
    console.log('a user connected');

    //const { idMessages } = socket.handshake.query;
    //socket.idMessages = idMessages;

    //socket.join(idMessages);

    //registerMessageHandlers(io, socket);
    //registerUserHandlers(io, socket);


    socket.on('disconnect', () => {
        console.log('user disconnected');
        //socket.leave(idMessages);
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
app.use('/api/lessons', authMiddleware, lessonRoutes);
app.use('/api/users', userRoutes);//аватарки тут
//app.use('/api/users/:username', authMiddleware, userRoutes);//Пока что я могу просматривать только себя, я использую свой токен чтобы узнать как меня зовут
app.use('/myprofile', authMiddleware, userController.getMyData)//Что если вместо верхнего, используем не публичный api, а тот который для каждого будет свой 

app.use('/api/auth', authRoutes);

app.use('/messages', authMiddleware, messageRoutes);

app.use('/news', authMiddleware, newsRoutes)

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