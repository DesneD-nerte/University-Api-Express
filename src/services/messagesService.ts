import MessagesRepository from "../repositories/messagesRepository";
import mongoose from "mongoose";
import ApiError from "../exceptions/apiError";
import Chat from "../models/Chat";
import { IQueryMessage, IQueryMyId, IBodyAddMessage, IBodyAddRoom, IBodyUpdateVisibleMessages } from "../types/servicesTypes/messageServiceTypes";

class MessagesService {
    async GetMessages (query: IQueryMessage) {
        try {
            const myId = new mongoose.Types.ObjectId(query.myId.toString());
            const id = new mongoose.Types.ObjectId(query.id.toString());

            let skip = 0;
            if(query.skip) {
                skip = Number.parseInt(query.skip.toString());
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

    async GetLastMessages(query: IQueryMyId) {
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
            
            const lastNewMessage = await this.GetMessages({myId: body.myId, id: body.id, skip: 0});
            
            return lastNewMessage.messages.pop();
        } catch(e) {
            return ApiError.BadRequest("Ошибка при добавлении нового сообщения");
        }
    }

    async AddRoom(body: IBodyAddRoom) {
        try {
            const firstUser = body.users[0];
            const secondUser = body.users[1];

            const addedRoom = await new Chat({users: [firstUser, secondUser], messages: []}).save();

            return addedRoom;
        } catch(e) {
            return ApiError.BadRequest("Ошибка при добавлении новой комнаты");
        }
    }

    async UpdateVisibleMessages(body: IBodyUpdateVisibleMessages) {
        try {
            const {messages, roomId, id } = body;
            const objectRoomId = new mongoose.Types.ObjectId(roomId);
            const objectId = new mongoose.Types.ObjectId(id);

            const arrayObjectIdMessages = messages.map(oneMessage => {
                return new mongoose.Types.ObjectId(oneMessage._id)
            })

            await Chat.updateOne(
                {_id: objectRoomId},
                {$set: {'messages.$[oneMessage].isVisible': true}},
                {arrayFilters: [{'oneMessage.user': objectId, 'oneMessage._id': {$in: [...arrayObjectIdMessages]}}]}
            )
        } catch(e) {
            return ApiError.BadRequest("Ошибка при обновлении счетчика просмотров сообщений");
        }
    }
}

export = new MessagesService();