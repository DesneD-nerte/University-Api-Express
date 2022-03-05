import mongoose from "mongoose";
import Chat from "../models/Chat";

export default class MessagesRepository {

    static async getMessages(myId: mongoose.Types.ObjectId, id: mongoose.Types.ObjectId) {
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
}