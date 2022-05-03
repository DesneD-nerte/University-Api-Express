import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import MessagesRepository from "../repositories/messagesRepository";
import mongoose from "mongoose";
import Chat from "../models/Chat";

class MessagesController {
    async GetMessages (req: Request, res: Response, next: NextFunction) {

        const myId = new mongoose.Types.ObjectId(req.query.myId?.toString());
        const id = new mongoose.Types.ObjectId(req.query.id?.toString());

        const myChatMessages = await MessagesRepository.getMessages(myId, id); //:Array
        const myChatMessagesObject = myChatMessages[0];

        // console.log(myChatMessagesObject);
        return res.json(myChatMessagesObject);
    }

    async CheckExistingChatRoomMessages (req: Request, res: Response, next: NextFunction) {

        const myId = new mongoose.Types.ObjectId(req.query.myId?.toString());
        const id = new mongoose.Types.ObjectId(req.query.id?.toString());

        const myChatMessages = await MessagesRepository.checkExistingChatRoomMessages(myId, id); //:Array
        const myChatMessagesObject = myChatMessages[0];

        return res.json(myChatMessagesObject);
    }

    async GetLastMessage(req: Request, res: Response, next: NextFunction) {

        const myId = new mongoose.Types.ObjectId(req.query.myId?.toString());
        const myLastMessages = await MessagesRepository.getLastMessage(myId);

        for (const oneInstance of myLastMessages) {
            let otherId; 

            for (const oneUser of oneInstance.users) {
                if(oneUser._id.toString() !== myId.toString()) {
                    otherId = new mongoose.Types.ObjectId(oneUser._id);
                    const countBadge = await MessagesRepository.getCountBadge(myId, otherId);

                    if(countBadge.length !== 0) {
                        oneInstance.countBadge = countBadge[0].count;
                    } else {
                        oneInstance.countBadge = 0;
                    }

                    break;
                }
            }
        }

        return res.json(myLastMessages);
    }

    async AddMessage(req: Request, res: Response, next: NextFunction) {

        const myId = new mongoose.Types.ObjectId(req.body.myId?.toString());
        const id = new mongoose.Types.ObjectId(req.body.id?.toString());
        const message = req.body.message;

        MessagesRepository.addMessage(myId, id, message)
        .then(result => res.sendStatus(200))
        .catch(error => res.send(error));

        //return res.sendStatus(200);
    }

    async AddRoom(req: Request, res: Response, next: NextFunction) {
        const firstUser = req.body.chatRoom.users[0]
        const secondUser = req.body.chatRoom.users[1];

        return await new Chat({users: [firstUser, secondUser], messages: []}).save();
    }

    // async UpdateVisibleMessage(req: Request, res: Response, next: NextFunction) {
    //     const {chatMessage, oneMessage} = req.body;
    //     await Chat.findOneAndUpdate({_id: chatMessage._id, "messages._id": oneMessage._id}, {$set: {"messages.$.isVisible": true}});

    //     return res.sendStatus(200);
    // }
    async UpdateVisibleAllMessages(req: Request, res: Response, next: NextFunction) {
        const {chatMessages, id} = req.body;
        console.log('chat', chatMessages);
        console.log('id', id);

        const chatObjectId = new mongoose.Types.ObjectId(chatMessages._id);
        const objectId = new mongoose.Types.ObjectId(id);
        console.log('chat', chatObjectId);
        console.log('user', objectId);

        // await Chat.updateOne({_id: chatMessage._id, 'messages.isVisible': false}, {$set: {'messages.$[].isVisible': true}}, {upsert: true})
        const lol = await Chat.updateOne(
            {_id: chatObjectId},
            {$set: {'messages.$[oneMessage].isVisible': true}},
            {arrayFilters: [{'oneMessage.user': objectId}]}
        )
        console.log(lol);
        global.io.emit('updateMessages');

        return res.sendStatus(200);
    }
}

export default new MessagesController();