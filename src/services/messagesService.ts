import messagesRepository from "../repositories/messagesRepository";
import ApiError from "../exceptions/apiError";
import { IQueryMessage, IQueryMyId, IBodyAddMessage, IBodyAddRoom, IBodyUpdateVisibleMessages } from "../types/servicesTypes/messageServiceTypes";
import mongooseService from "./mongooseService";

class MessagesService {
	async GetMessages (query: IQueryMessage) {
		try {
			const myId = mongooseService.ToObjectId(query.myId);
			const id = mongooseService.ToObjectId(query.id);

			let skip = 0;
			if(query.skip) {
				skip = Number.parseInt(query.skip.toString());
			}
			const myChatMessages = await messagesRepository.GetMessages(myId, id, skip);

			return myChatMessages[0];
		} catch(e) {
			return ApiError.BadRequest("Ошибка при получении сообщений пользователей", e);
		}
	}

	//Облегченная версия получения сообщений (без развертывания объектов)
	async CheckExistingChatRoomMessages (query: IQueryMessage) {
		try {
			const myId = mongooseService.ToObjectId(query.myId);
			const id = mongooseService.ToObjectId(query.id);

			const myChatMessages = await messagesRepository.CheckExistingChatRoomMessages(myId, id);

			return myChatMessages[0];
		} catch (e) {
			return ApiError.BadRequest("Ошибка при получении сообщений пользователей");
		}
	}

	async GetLastMessages(query: IQueryMyId) {
		try {
			const myId = mongooseService.ToObjectId(query.myId);
			const myLastMessages = await messagesRepository.GetLastMessage(myId);

			for (const oneInstance of myLastMessages) {
				let otherId; 

				for (const oneUser of oneInstance.users) {
					if(oneUser._id.toString() !== myId.toString()) {
						otherId = mongooseService.ToObjectId(oneUser._id);
						const countBadge = await messagesRepository.GetCountBadge(myId, otherId);

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
			return ApiError.BadRequest("Ошибка при получении сообщений для главного окна");
		}
	}

	async AddMessage(body: IBodyAddMessage) {
		try {
			const myId = mongooseService.ToObjectId(body.myId);
			const id = mongooseService.ToObjectId(body.id);
			const message = body.message;

			const addedMessage = await messagesRepository.AddMessage(myId, id, message);
            
			const query: IQueryMessage = {
				myId: body.myId,
				id: body.id,
				skip: 0
			};

			const lastNewMessage = await this.GetMessages(query);
            
			return lastNewMessage.messages.pop();
		} catch(e) {
			return ApiError.BadRequest("Ошибка при добавлении нового сообщения");
		}
	}

	async AddRoom(body: IBodyAddRoom) {
		try {
			const firstUser = mongooseService.ToObjectId(body.users[0]);
			const secondUser = mongooseService.ToObjectId(body.users[1]);

			const addedRoom = await messagesRepository.AddRoom(firstUser, secondUser);

			return addedRoom;
		} catch(e) {
			return ApiError.BadRequest("Ошибка при добавлении новой комнаты");
		}
	}

	async UpdateVisibleMessages(body: IBodyUpdateVisibleMessages) {
		try {
			const objectId = mongooseService.ToObjectId(body.id);
			const objectRoomId = mongooseService.ToObjectId(body.roomId);

			const arrayObjectIdMessages = body.messages.map(oneMessage => {
				return mongooseService.ToObjectId(oneMessage._id as string);
			});

			await messagesRepository.UpdateVisibleMessages(objectId, objectRoomId, arrayObjectIdMessages);
		} catch(e) {
			return ApiError.BadRequest("Ошибка при обновлении счетчика просмотров сообщений");
		}
	}
}

export = new MessagesService();