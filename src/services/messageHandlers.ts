const mongoose = require('mongoose');
import Chat from '../models/Chat';
import messageRepository from '../repositories/messagesRepository';
import { Message } from '../types';

module.exports = (io: any, socket: any) => {
    
    const getMessages = () => {
		const myId = new mongoose.Types.ObjectId('61dd80af4b4cec30d30ab908');
		const id = new mongoose.Types.ObjectId('61fe65bca9952e94f6a9321b');

		const messages = messageRepository.getMessages(myId, id);
		
		// передаем сообщения пользователям, находящимся в комнате
		io.in(socket.idMessages).emit('messages', messages)
    }
  
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
	socket.on('message:get', getMessages)
	//socket.on('message:add', addMessage)
}