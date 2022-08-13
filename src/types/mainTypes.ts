import { Schema } from "mongoose";

export interface IUser {
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

export interface IMessage  {
    // _id?: Schema.Types.ObjectId,
    _id?: string,
    content: string,
    createdAt: Date,
    user: Schema.Types.ObjectId,
    // user: string,
    isVisible: boolean
}

export interface IChatRoom {
    _id?: string;
    users: IUser[];
}

export interface IChatType {
	_id?: string;
	users: Array<IUser>;
	messages: Array<IMessage>;
}