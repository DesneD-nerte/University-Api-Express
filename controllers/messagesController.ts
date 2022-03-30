import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import Lesson from "../models/Lesson";
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

        // console.log(myLastMessages);
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
}

export default new MessagesController();