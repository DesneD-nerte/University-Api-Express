import http from 'http';
import { Server, Socket } from 'socket.io';
import MessagesRepository from '../repositories/messagesRepository';
import messagesService from '../services/messagesService';
import { IQueryMessage } from '../types';

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
    
            // global.connectedUsers = connectedUsers;
    
            messagesService.GetLastMessage({ myId })
            .then((data) => {
                console.log("updateLastMessages");
                socket.emit('updateLastMessages', data);
            })
        })
    
        socket.on('sendMessage', (data: any) => {
            console.log('sendMessage server');
            console.log(connectedUsers);
    
            const receiverId = data.receiverId;
            const {content, createdAt, user, isVisible} = data.message;
            const mainMessage = {content, createdAt, user, isVisible};

            const body = {
                myId: user._id, 
                id: receiverId,
                message: mainMessage
            }
            console.log(body);
            messagesService.AddMessage(body)
            .then((message) => {
                console.log(body);
                messagesService.GetLastMessage({myId: body.myId})
                .then((lastMessages) => {
                    console.log(lastMessages);
                    io.to(connectedUsers[body.myId]).emit('updateLastMessages', lastMessages);
                });
                // messagesService.GetLastMessage(body.id)
                // .then((lastMessages) => {
                //     io.to(connectedUsers[body.id]).emit('updateLastMessages', lastMessages);
                // })
                messagesService.GetMessages({myId: body.myId, id: body.id, skip: '0'})
                .then((roomMessages) => {
                    io.to(connectedUsers[user._id]).emit('updateRoomMessages', roomMessages);
                    // io.to(connectedUsers[receiverId]).emit('updateRoomMessages', roomMessages);
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
                socket.emit("updateRoomMessages", messages);
            })
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}