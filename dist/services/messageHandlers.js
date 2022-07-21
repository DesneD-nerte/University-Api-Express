"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const messagesRepository_1 = __importDefault(require("../repositories/messagesRepository"));
module.exports = (io, socket) => {
    const getMessages = () => {
        const myId = new mongoose.Types.ObjectId('61dd80af4b4cec30d30ab908');
        const id = new mongoose.Types.ObjectId('61fe65bca9952e94f6a9321b');
        const messages = messagesRepository_1.default.getMessages(myId, id);
        // передаем сообщения пользователям, находящимся в комнате
        io.in(socket.idMessages).emit('messages', messages);
    };
    // const addMessage = (message: string) => {
    // 	const myId = new mongoose.Types.ObjectId('61dd80af4b4cec30d30ab908');
    // 	// const newMessage: Message = {
    // 	// 	content: message,
    // 	// 	createdAt: new Date((new Date()).getTime()),
    // 	// 	user: myId
    // 	// }
    // 	Chat.updateOne()
    // 	// выполняем запрос на получение сообщений
    // 	// getMessages()
    // }
    // регистрируем обработчики
    socket.on('message:get', getMessages);
    //socket.on('message:add', addMessage)
};
