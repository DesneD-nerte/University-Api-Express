import { NextFunction, Request, Response } from "express";
import messagesService from "../services/messagesService";
import { IQueryMessage, IQueryMyId, IBodyAddMessage, IBodyAddRoom } from "../types/servicesTypes/messageServiceTypes";

class MessagesController {
	async GetMessages(req: Request<any, any, any, IQueryMessage>, res: Response, next: NextFunction) {
		try {
			const myChatMessagesObject = await messagesService.GetMessages(req.query);

			return res.json(myChatMessagesObject);
		} catch (err) {
			next(err);
		}
	}

	async CheckExistingChatRoomMessages(req: Request<any, any, any, IQueryMessage>, res: Response, next: NextFunction) {
		try {
			const myChatMessagesObject = await messagesService.CheckExistingChatRoomMessages(req.query);

			return res.json(myChatMessagesObject);
		} catch (err) {
			next(err);
		}
	}

	async GetLastMessages(req: Request<any, any, any, IQueryMyId>, res: Response, next: NextFunction) {
		try {
			const myLastMessages = await messagesService.GetLastMessages(req.query);

			return res.json(myLastMessages);
		} catch (err) {
			next(err);
		}
	}

	async AddMessage(req: Request<any, any, IBodyAddMessage, any>, res: Response, next: NextFunction) {
		try {
			const addedMessage = await messagesService.AddMessage(req.body);

			return res.json(addedMessage);
		} catch (err) {
			next(err);
		}
	}

	async AddRoom(req: Request<any, any, IBodyAddRoom, any>, res: Response, next: NextFunction) {
		try {
			const arrayUsers = req.body;
			const addedRoom = await messagesService.AddRoom(arrayUsers);

			return res.json(addedRoom);
		} catch (err) {
			next(err);
		}
	}

	async UpdateVisibleAllMessages(req: Request, res: Response, next: NextFunction) {
		try {
			await messagesService.UpdateVisibleMessages(req.body);

			return res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}
}

export default new MessagesController();
