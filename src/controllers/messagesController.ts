import { Request, Response } from "express";
import messagesService from "../services/messagesService";
import { BareRequestParams, BareResponseBody, BareRequestBody, IQueryMessage, IQueryMyId, BareRequestQuery, IBodyAddMessage, IBodyAddRoom } from "../types";

class MessagesController {
    async GetMessages (req: Request<BareRequestParams, BareResponseBody, BareRequestBody, IQueryMessage>, res: Response) {

        const myChatMessagesObject = await messagesService.GetMessages(req.query);

        return res.json(myChatMessagesObject);
    }

    async CheckExistingChatRoomMessages (req: Request<BareRequestParams, BareResponseBody, BareRequestBody, IQueryMessage>, res: Response) {

        const myChatMessagesObject = await messagesService.CheckExistingChatRoomMessages(req.query)

        return res.json(myChatMessagesObject);
    }

    async GetLastMessage(req: Request<BareRequestParams, BareResponseBody, BareRequestBody, IQueryMyId>, res: Response) {

        const myLastMessages = await messagesService.GetLastMessage(req.query);

        return res.json(myLastMessages);
    }

    async AddMessage(req: Request<BareRequestParams, BareResponseBody, IBodyAddMessage, BareRequestQuery>, res: Response) {

        const addedMessage = await messagesService.AddMessage(req.body);
        
        return res.json(addedMessage);
    }

    async AddRoom(req: Request<BareRequestParams, BareResponseBody, IBodyAddRoom, BareRequestQuery>, res: Response) {
        
        const addedRoom = await messagesService.AddRoom(req.body); 
        
        return res.json(addedRoom);
    }

    async UpdateVisibleAllMessages(req: Request, res: Response) {
        await messagesService.UpdateVisibleAllMessages(req.body);

        return res.sendStatus(200);
    }
}

export default new MessagesController();