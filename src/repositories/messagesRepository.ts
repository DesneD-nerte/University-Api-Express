import mongoose from "mongoose";
import Chat from "../models/Chat";
import User from "../models/User";
import { IMessage } from "../types/mainTypes";


export default class MessagesRepository {

    static async GetMessages(myId: mongoose.Types.ObjectId, id: mongoose.Types.ObjectId, skip: number) {
        return await Chat.aggregate([
            {
                $match: {
                    $and: [
                      {users: myId},
                      {users: id}
                    ]
                }
             },
            {    
                $lookup: {
                    from: 'users',
                    localField: 'users',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $unwind: {
                    path: "$messages"
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'messages.user',
                    foreignField: '_id',
                    as: 'messages.user'
                }
            },
            {
                $unwind: {
                    path: '$messages.user'
                }
            },
            {
                $sort: {
                    "messages._id": -1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: 20
            },
            {
                $sort: {
                    "messages._id": 1
                }
            },
            {
                $group: {
                    _id: '$_id',
                    root: { $mergeObjects: '$$ROOT' },
                    messages: { $push: '$messages' }
                }
            },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: ['$root', '$$ROOT'] }
                }
            },
            {
                $project: { root: 0 }
            }
        ]
        )
    }

    static async CheckExistingChatRoomMessages(myId: mongoose.Types.ObjectId, id: mongoose.Types.ObjectId) {
        return await Chat.aggregate([
            {
                $match: {
                    $and: [
                      {users: myId},
                      {users: id}
                    ]
                }
            },
        ])
    }

    static async GetCountBadge(myId: mongoose.Types.ObjectId, other: mongoose.Types.ObjectId) {
        return await Chat.aggregate([
            {
                $unwind: '$messages'
            },
            {
                $match: {
                    'users': {$in: [myId]}, //Пользователь который запрашивает
                    'messages.user': other  //Другой пользователь
                },
            },
            {
                $sortByCount: '$messages.isVisible'
            },
            {
                $match: {
                    '_id': false
                }
            }
        ])
    }

    static async GetLastMessage(myId: mongoose.Types.ObjectId) {
        return await Chat.aggregate([
            {
                $match: {
                    'users': myId
                }
            },
            {
                $project: {
                    'users': 1,
                    'lastMessage': {$slice: ['$messages', -1]}
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'users',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $unwind: {
                    path: '$lastMessage'
                }
            }, 
            {
                $lookup: {
                    from: 'users',
                    localField: 'lastMessage.user',
                    foreignField: '_id',
                    as: 'lastMessage.user'
                }
            },
            {
                $unwind: {
                    path: '$lastMessage.user'
                }
            }
        ])
    }

    static async AddMessage(myId: mongoose.Types.ObjectId, id: mongoose.Types.ObjectId, message: IMessage) {

        return await Chat.findOneAndUpdate({
                users: {$all: [new mongoose.Types.ObjectId(myId), new mongoose.Types.ObjectId(id)]}},
            {
                $push: {messages: {content: message.content, createdAt: new Date (message.createdAt), user: new User(message.user), isVisible: message.isVisible}},
            },
            {
                new: true
            }
        )
    }
}