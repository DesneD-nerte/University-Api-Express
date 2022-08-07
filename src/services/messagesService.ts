import MessagesRepository from "../repositories/messagesRepository";
import mongoose from "mongoose";
import ApiError from "../exceptions/apiError";
import { IBodyAddMessage, IQueryMessage, IQueryMyId, IBodyAddRoom, IBodyUpdateVisibleMessages } from "../types";
import Chat from "../models/Chat";

class MessagesService {
    async GetMessages (query: IQueryMessage) {
        try {
            const myId = new mongoose.Types.ObjectId(query.myId.toString());
            const id = new mongoose.Types.ObjectId(query.id.toString());

            let skip = 0;
            if(query.skip) {
                skip = parseInt(query.skip.toString());
            }
            const myChatMessages = await MessagesRepository.GetMessages(myId, id, skip);

            return myChatMessages[0];
        } catch(e) {
            return ApiError.BadRequest("Ошибка при получении сообщений пользователей", e);
        }
    }

    //Облегченная версия получения сообщений (без развертывания объектов)
    async CheckExistingChatRoomMessages (query: IQueryMessage) {
        try {
            const myId = new mongoose.Types.ObjectId(query.myId.toString());
            const id = new mongoose.Types.ObjectId(query.id.toString());

            const myChatMessages = await MessagesRepository.CheckExistingChatRoomMessages(myId, id);

            return myChatMessages[0];
        } catch (e) {
            return ApiError.BadRequest("Ошибка при получении сообщений пользователей")
        }
    }

    async GetLastMessage(query: IQueryMyId) {
        try {
            const myId = new mongoose.Types.ObjectId(query.myId?.toString());
            const myLastMessages = await MessagesRepository.GetLastMessage(myId);

            for (const oneInstance of myLastMessages) {
                let otherId; 

                for (const oneUser of oneInstance.users) {
                    if(oneUser._id.toString() !== myId.toString()) {
                        otherId = new mongoose.Types.ObjectId(oneUser._id);
                        const countBadge = await MessagesRepository.GetCountBadge(myId, otherId);

                        if(countBadge.length !== 0) {
                            oneInstance.countBadge = countBadge[0].count;
                        } else {
                            oneInstance.countBadge = 0;
                        }

                        break;
                    }
                }
            }

            return myLastMessages;
        } catch(e) {
            console.log(e);
            return ApiError.BadRequest("Ошибка при получении сообщений для главного окна");
        }
    }

    async AddMessage(body: IBodyAddMessage) {
        try {
            const myId = new mongoose.Types.ObjectId(body.myId?.toString());
            const id = new mongoose.Types.ObjectId(body.id?.toString());
            const message = body.message;

            const addedMessage = await MessagesRepository.AddMessage(myId, id, message);

            return addedMessage;
        } catch(e) {
            return ApiError.BadRequest("Ошибка при добавлении нового сообщения");
        }
    }

    async AddRoom(body: IBodyAddRoom) {
        try {
            const firstUser = body.chatRoom.users[0];
            const secondUser = body.chatRoom.users[1];

            const addedRoom = await new Chat({users: [firstUser, secondUser], messages: []}).save();

            return addedRoom;
        } catch(e) {
            return ApiError.BadRequest("Ошибка при добавлении новой комнаты");
        }
    }

    async UpdateVisibleAllMessages(body: IBodyUpdateVisibleMessages) {
        try {
            const {chatMessages, id, myId} = body;

            const chatObjectId = new mongoose.Types.ObjectId(chatMessages._id);
            const objectId = new mongoose.Types.ObjectId(id);

            await Chat.updateOne(
                {_id: chatObjectId},
                {$set: {'messages.$[oneMessage].isVisible': true}},
                {arrayFilters: [{'oneMessage.user': objectId}]}
            )
            
            // global.io.to(global.connectedUsers[myId]).emit('updateMessages');
        } catch(e) {
            return ApiError.BadRequest("Ошибка при обновлении счетчика просмотров сообщений");
        }
    }
}

export = new MessagesService();