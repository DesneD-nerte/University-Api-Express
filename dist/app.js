"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userController_1 = __importDefault(require("./controllers/userController"));
const messagesRepository_1 = __importDefault(require("./repositories/messagesRepository"));
const fileController_1 = __importDefault(require("./controllers/fileController"));
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
const app = (0, express_1.default)();
const httpServer = require('http').createServer(app);
const { Server } = require("socket.io");
var io = new Server(httpServer);
global.io = io;
var connectedUsers = {};
io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('logged-in', (myId) => {
        connectedUsers[myId] = socket.id;
        global.connectedUsers = connectedUsers;
    });
    socket.on('sendMessage', (result) => {
        console.log('sendMessage server');
        console.log(connectedUsers);
        const { content, createdAt, user, isVisible } = result.message;
        const mainMessage = { content, createdAt, user, isVisible };
        messagesRepository_1.default.addMessage(result.message.user._id, result.receiverId, mainMessage)
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
};
//app.use(cors(corsOptions));
app.use((0, cors_1.default)());
const fileUpload = require('express-fileupload');
app.use(fileUpload({}));
//app.use(formData.parse());
app.use(express_1.default.json());
;
//app.use('/', authMiddleware);
app.use('/api/lessons', lessonRoutes);
app.use('/api/audiences', audienceRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/auth', authRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use('/currentlessons', authMiddleware, currentLessonRoutes);
app.use('/marks', authMiddleware, markRoutes);
app.use('/myprofile', authMiddleware, userController_1.default.GetMyData);
app.use('/messages', authMiddleware, messageRoutes);
app.use('/news', authMiddleware, newsRoutes);
app.get('/files/getExcelTemplate', authMiddleware, fileController_1.default.LoadExcelTemplate);
app.get('/images/:imageName', fileController_1.default.LoadLoginImages);
app.get('/avatar/:id', fileController_1.default.LoadImage);
app.post('/upload', authMiddleware, fileController_1.default.SaveImage);
app.use(errorMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config.connectionString);
        httpServer.listen(config.port, () => console.log(`server started on ${config.port} port`));
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
});
start();
