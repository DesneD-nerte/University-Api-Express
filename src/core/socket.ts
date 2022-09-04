import http from "http";
import { Server, Socket } from "socket.io";
import messagesService from "../services/messagesService";
import { IBodyUpdateVisibleMessages, IQueryMessage } from "../types/servicesTypes/messageServiceTypes";

type connectedUsersType = {
    [key: string]: string
}

export default (http: http.Server) => {
	const io = new Server(http);
    
	const connectedUsers: connectedUsersType = {};

	io.on("connection", (socket: Socket) => {
		console.log("a user connected " + socket.id);
        
		socket.on("logged-in", (myId: string) => {
			connectedUsers[myId] = socket.id;
    
			messagesService.GetLastMessages({ myId })
				.then((data) => {
					console.log("updateLastMessages");
					socket.emit("updateLastMessages", data);
				});
		});
    
		socket.on("sendMessage", (data: any) => {
			const receiverId = data.receiverId;
			const {content, createdAt, user, isVisible} = data.message;
			const mainMessage = {content, createdAt, user, isVisible};

			const body = {
				myId: user._id, 
				id: receiverId,
				message: mainMessage
			};

			messagesService.AddMessage(body)
				.then((message) => {
					messagesService.GetLastMessages({myId: body.myId})
						.then((lastMessages) => {
							io.to(connectedUsers[body.myId]).emit("updateLastMessages", lastMessages);
						});
					messagesService.GetLastMessages({myId: body.id})
						.then((lastMessages) => {
							io.to(connectedUsers[body.id]).emit("updateLastMessages", lastMessages);
						});
                
					messagesService.GetMessages({myId: body.myId, id: body.id, skip: 0})
						.then((roomMessages) => {
							io.to(roomMessages._id.toString()).emit("updateRoomMessages", message);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		});
    
		socket.on("onEnterTheRoom", (data: IQueryMessage) => {
			messagesService.GetMessages(data)
				.then((messages) => {
					if(messages) {
						socket.join(messages._id.toString());

						socket.emit("loadInitialRoomMessages", messages);
					} else {
						messagesService.AddRoom({users: [data.myId, data.id]})
							.then((addedRoom) => {
								socket.join(addedRoom._id.toString());
							}); 
					}
				});
		});

		socket.on("onLoadNewMessages", (data: IQueryMessage) => {
			messagesService.GetMessages(data)
				.then((messages) => {
					socket.emit("loadNewRoomMessages", messages);
				});
		});

		socket.on("onUpdateVisibleMessages", (data: IBodyUpdateVisibleMessages) => {
			messagesService.UpdateVisibleMessages(data);
		});
    
		socket.on("disconnect", () => {
			console.log("user disconnected");
		});
	});

	return io;
};