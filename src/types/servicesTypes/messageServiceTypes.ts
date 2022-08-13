import { IChatRoom, IChatType, IMessage } from "../mainTypes"

export interface IQueryMessage {
    myId: string,
    id: string,
    skip: number | undefined
}
export interface IQueryMyId {
    myId: string,
}

export interface IBodyAddMessage {
    myId: string,
    id: string,
    message: IMessage
}

export interface IBodyAddRoom {
    users: Array<string>
}

export interface IBodyUpdateVisibleMessages {
    messages: IMessage[],
    roomId: string,
    id: string,
}