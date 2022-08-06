import MessagesRepository from "../repositories/messagesRepository";
import mongoose from "mongoose";
import ApiError from "../exceptions/apiError";

interface IQueryMessage {
    myId: string,
    id: string,
    skip: string | undefined
}

export class MessagesService {
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

    // async CheckExistingChatRoomMessages (req: Request, res: Response, next: NextFunction) {

    //     const myId = new mongoose.Types.ObjectId(req.query.myId?.toString());
    //     const id = new mongoose.Types.ObjectId(req.query.id?.toString());

    //     const myChatMessages = await MessagesRepository.CheckExistingChatRoomMessages(myId, id); //:Array
    //     const myChatMessagesObject = myChatMessages[0];

    //     return res.json(myChatMessagesObject);
    // }

    // async GetLastMessage(req: Request, res: Response, next: NextFunction) {

    //     const myId = new mongoose.Types.ObjectId(req.query.myId?.toString());
    //     const myLastMessages = await MessagesRepository.GetLastMessage(myId);

    //     for (const oneInstance of myLastMessages) {
    //         let otherId; 

    //         for (const oneUser of oneInstance.users) {
    //             if(oneUser._id.toString() !== myId.toString()) {
    //                 otherId = new mongoose.Types.ObjectId(oneUser._id);
    //                 const countBadge = await MessagesRepository.GetCountBadge(myId, otherId);

    //                 if(countBadge.length !== 0) {
    //                     oneInstance.countBadge = countBadge[0].count;
    //                 } else {
    //                     oneInstance.countBadge = 0;
    //                 }

    //                 break;
    //             }
    //         }
    //     }

    //     return res.json(myLastMessages);
    // }

    // async AddMessage(req: Request, res: Response, next: NextFunction) {

    //     const myId = new mongoose.Types.ObjectId(req.body.myId?.toString());
    //     const id = new mongoose.Types.ObjectId(req.body.id?.toString());
    //     const message = req.body.message;

    //     MessagesRepository.AddMessage(myId, id, message)
    //         .then(result => res.sendStatus(200))
    //         .catch(error => res.send(error));

    //     //return res.sendStatus(200);
    // }

    // async AddRoom(req: Request, res: Response, next: NextFunction) {
    //     const firstUser = req.body.chatRoom.users[0]
    //     const secondUser = req.body.chatRoom.users[1];

    //     return await new Chat({users: [firstUser, secondUser], messages: []}).save();
    // }

    // async UpdateVisibleAllMessages(req: Request, res: Response, next: NextFunction) {
    //     const {chatMessages, id, myId} = req.body;

    //     const chatObjectId = new mongoose.Types.ObjectId(chatMessages._id);
    //     const objectId = new mongoose.Types.ObjectId(id);

    //     await Chat.updateOne(
    //         {_id: chatObjectId},
    //         {$set: {'messages.$[oneMessage].isVisible': true}},
    //         {arrayFilters: [{'oneMessage.user': objectId}]}
    //     )
        
    //     global.io.to(global.connectedUsers[myId]).emit('updateMessages');

    //     return res.sendStatus(200);
    // }
}