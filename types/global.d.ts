import socketIO, { Socket } from "socket.io";
import * as ios from 'socket.io';

type connectedUsersType = {
    [key: string]: string
}

declare global {
    var io: ios.Server;
    var connectedUsers: connectedUsersType; 
}

export {}
// declare var io: ios.Server 