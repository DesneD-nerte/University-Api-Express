import socketIO, { Socket } from "socket.io";
import * as ios from 'socket.io';

declare global {
    var io: ios.Server;
}

export {}
// declare var io: ios.Server 