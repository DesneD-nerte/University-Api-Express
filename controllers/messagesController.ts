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

        const myChatMessages = await MessagesRepository.getMessages(myId, id);
        
        //console.log(myChatMessages);
        return res.json(myChatMessages);
    }

    async GetLastMessage(req: Request, res: Response, next: NextFunction) {

        const myId = new mongoose.Types.ObjectId(req.query.myId?.toString());

        const myLastMessages = await MessagesRepository.getLastMessage(myId);

        console.log(myLastMessages);
        return res.json(myLastMessages);
    }

    // async AddMessage(req: Request, res: Response, next: NextFunction) {
    //     await MessagesRepository.addMessage(req.)
    // }
}

export default new MessagesController();