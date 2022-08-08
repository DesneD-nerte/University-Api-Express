import http from 'http';
import { Server, Socket } from 'socket.io';
import messagesService from '../services/messagesService';
import { IBodyUpdateVisibleMessages, IQueryMessage } from '../types';

type connectedUsersType = {
    [key: string]: string
}

export default (http: http.Server) => {
    const io = new Server(http);
    
    const connectedUsers: connectedUsersType = {};

    io.on('connection', (socket: Socket) => {
        console.log('a user connected ' + socket.id);
        
        socket.on('logged-in', (myId: string) => {
            connectedUsers[myId] = socket.id;
    
            messagesService.GetLastMessage({ myId })
            .then((data) => {
                console.log("updateLastMessages");
                socket.emit('updateLastMessages', data);
            })
        })
    
        socket.on('sendMessage', (data: any) => {
            console.log('sendMessage server');
    
            const receiverId = data.receiverId;
            const {content, createdAt, user, isVisible} = data.message;
            const mainMessage = {content, createdAt, user, isVisible};

            const body = {
                myId: user._id, 
                id: receiverId,
                message: mainMessage
            }

            messagesService.AddMessage(body)
            .then((message) => {
                messagesService.GetLastMessage({myId: body.myId})
                .then((lastMessages) => {
                    io.to(connectedUsers[body.myId]).emit('updateLastMessages', lastMessages);
                });
                messagesService.GetLastMessage({myId: body.id})
                .then((lastMessages) => {
                    io.to(connectedUsers[body.id]).emit('updateLastMessages', lastMessages);
                });

                messagesService.GetMessages({myId: body.myId, id: body.id, skip: '0'})
                .then((roomMessages) => {
                    io.to(roomMessages._id.toString()).emit('updateRoomMessages', roomMessages);
                })
            })
            .catch((err) => {
                console.log(err);
            })
        });
    
        socket.on('onEnterTheRoom', (data: IQueryMessage) => {
            console.log('enter the room server');

            messagesService.GetMessages(data)
            .then((messages) => {
                socket.join(messages._id.toString());

                socket.emit("updateRoomMessages", messages);
            })
        })

        socket.on("onUpdateVisibleMessages", (data: IBodyUpdateVisibleMessages) => {
            console.log('update visible essages server');

            messagesService.UpdateVisibleAllMessages(data)
            .then(() => {
                messagesService.GetLastMessage({myId: data.myId})
                .then((messages) => {
                    io.to(connectedUsers[data.myId]).emit('updateLastMessages', messages);
                })
            })
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
}