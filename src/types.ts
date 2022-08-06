import { Schema } from "mongoose";

export interface BareRequestParams {}
export interface BareResponseBody {}
export interface BareRequestBody {}
export interface BareRequestQuery {}

export interface IQueryMessage {
    myId: string,
    id: string,
    skip: string | undefined
}
export interface IQueryMyId {
    myId: string,
}

export interface IBodyAddMessage {
    myId: string,
    id: string,
    message: Message
}

export interface IBodyAddRoom {
    chatRoom: IChatRoom
}

export interface IBodyUpdateVisibleMessages {
    chatMessages: IChatType,
    myId: string
    id: string,
}


export interface User {
    _id: string,
    username: string,
    name: string,
    roles: Array<string>,
    email: string,
	imageUri?: string,
    faculties?: Array<string>,
    departments?: Array<string>,
    groups?: Array<string>
}

export interface Message  {
    _id?: Schema.Types.ObjectId,
    content: string,
    createdAt: Date,
    user: Schema.Types.ObjectId,
    isVisible: boolean
}

export interface IChatRoom {
    _id?: string;
    users: User[];
    lastMessage: Message;
    countBadge: number;
}

export interface IChatType {
	_id?: string;
	users: Array<User>;
	messages: Array<Message>;
}