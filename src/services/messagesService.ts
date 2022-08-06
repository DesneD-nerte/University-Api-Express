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

    async CheckExistingChatRoomMessages (query: IQueryMessage) {

        const myId = new mongoose.Types.ObjectId(query.myId.toString());
        const id = new mongoose.Types.ObjectId(query.id.toString());

        const myChatMessages = await MessagesRepository.CheckExistingChatRoomMessages(myId, id);

        return myChatMessages[0];
    }

    async GetLastMessage(query: IQueryMyId) {

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
    }

    async AddMessage(body: IBodyAddMessage) {

        const myId = new mongoose.Types.ObjectId(body.myId?.toString());
        const id = new mongoose.Types.ObjectId(body.id?.toString());
        const message = body.message;

        const addedMessage = await MessagesRepository.AddMessage(myId, id, message);

        return addedMessage;
    }

    async AddRoom(body: IBodyAddRoom) {
        const firstUser = body.chatRoom.users[0]
        const secondUser = body.chatRoom.users[1];

        const addedRoom = await new Chat({users: [firstUser, secondUser], messages: []}).save();

        return addedRoom;
    }

    async UpdateVisibleAllMessages(body: IBodyUpdateVisibleMessages) {
        const {chatMessages, id, myId} = body;

        const chatObjectId = new mongoose.Types.ObjectId(chatMessages._id);
        const objectId = new mongoose.Types.ObjectId(id);

        await Chat.updateOne(
            {_id: chatObjectId},
            {$set: {'messages.$[oneMessage].isVisible': true}},
            {arrayFilters: [{'oneMessage.user': objectId}]}
        )
        
        global.io.to(global.connectedUsers[myId]).emit('updateMessages');
    }
}

export = new MessagesService();