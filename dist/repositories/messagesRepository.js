"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Chat_1 = __importDefault(require("../models/Chat"));
const User_1 = __importDefault(require("../models/User"));
//import { Message } from '../models/Message';
class MessagesRepository {
    static getMessages(myId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Chat_1.default.aggregate([
                {
                    $match: {
                        $and: [
                            { users: myId },
                            { users: id }
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
            ]);
        });
    }
    static testgetMessages(myId, id, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Chat_1.default.aggregate([
                {
                    $match: {
                        $and: [
                            { users: myId },
                            { users: id }
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
            ]);
        });
    }
    static checkExistingChatRoomMessages(myId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Chat_1.default.aggregate([
                {
                    $match: {
                        $and: [
                            { users: myId },
                            { users: id }
                        ]
                    }
                },
            ]);
        });
    }
    static getCountBadge(myId, other) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Chat_1.default.aggregate([
                {
                    $unwind: '$messages'
                },
                {
                    $match: {
                        'users': { $in: [myId] },
                        'messages.user': other //Другой пользователь
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
            ]);
        });
    }
    static getLastMessage(myId) {
        return __awaiter(this, void 0, void 0, function* () {
            //return await Chat.find({'users': myId}, {'lastMessage': {$slice: ['$messages', -1]}, 'users': 1 });
            return yield Chat_1.default.aggregate([
                {
                    $match: {
                        'users': myId
                    }
                },
                {
                    $project: {
                        'users': 1,
                        'lastMessage': { $slice: ['$messages', -1] }
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
            ]);
        });
    }
    static addMessage(myId, id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('new message', message);
            return yield Chat_1.default.updateOne({
                users: { $all: [new mongoose_1.default.Types.ObjectId(myId), new mongoose_1.default.Types.ObjectId(id)] }
            }, {
                $push: { messages: { content: message.content, createdAt: new Date(message.createdAt), user: new User_1.default(message.user), isVisible: message.isVisible } }
            });
        });
    }
}
exports.default = MessagesRepository;
