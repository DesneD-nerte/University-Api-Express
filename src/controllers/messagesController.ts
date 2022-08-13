import { Request, Response } from "express";
import messagesService from "../services/messagesService";
import { IQueryMessage, IQueryMyId, IBodyAddMessage, IBodyAddRoom } from "../types/servicesTypes/messageServiceTypes";
import { IBareRequestParams, IBareResponseBody, IBareRequestBody, IBareRequestQuery } from "../types/servicesTypes/types";

class MessagesController {
    async GetMessages (req: Request<IBareRequestParams, IBareResponseBody, IBareRequestBody, IQueryMessage>, res: Response) {

        const myChatMessagesObject = await messagesService.GetMessages(req.query);

        return res.json(myChatMessagesObject);
    }

    async CheckExistingChatRoomMessages (req: Request<IBareRequestParams, IBareResponseBody, IBareRequestBody, IQueryMessage>, res: Response) {

        const myChatMessagesObject = await messagesService.CheckExistingChatRoomMessages(req.query)

        return res.json(myChatMessagesObject);
    }

    async GetLastMessages(req: Request<IBareRequestParams, IBareResponseBody, IBareRequestBody, IQueryMyId>, res: Response) {

        const myLastMessages = await messagesService.GetLastMessages(req.query);

        return res.json(myLastMessages);
    }

    async AddMessage(req: Request<IBareRequestParams, IBareResponseBody, IBodyAddMessage, IBareRequestQuery>, res: Response) {

        const addedMessage = await messagesService.AddMessage(req.body);
        
        return res.json(addedMessage);
    }

    async AddRoom(req: Request<IBareRequestParams, IBareResponseBody, IBodyAddRoom, IBareRequestQuery>, res: Response) {
        
        const addedRoom = await messagesService.AddRoom(req.body); 
        
        return res.json(addedRoom);
    }

    async UpdateVisibleAllMessages(req: Request, res: Response) {
        await messagesService.UpdateVisibleMessages(req.body);

        return res.sendStatus(200);
    }
}

export default new MessagesController();