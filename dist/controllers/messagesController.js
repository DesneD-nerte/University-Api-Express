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
const messagesRepository_1 = __importDefault(require("../repositories/messagesRepository"));
const mongoose_1 = __importDefault(require("mongoose"));
const Chat_1 = __importDefault(require("../models/Chat"));
class MessagesController {
    GetMessages(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const myId = new mongoose_1.default.Types.ObjectId((_a = req.query.myId) === null || _a === void 0 ? void 0 : _a.toString());
            const id = new mongoose_1.default.Types.ObjectId((_b = req.query.id) === null || _b === void 0 ? void 0 : _b.toString());
            let skip = 0;
            if (req.query.skip) {
                skip = parseInt((_c = req.query.skip) === null || _c === void 0 ? void 0 : _c.toString());
            }
            // const myChatMessages = await MessagesRepository.getMessages(myId, id); //:Array
            const myChatMessages = yield messagesRepository_1.default.testgetMessages(myId, id, skip);
            const myChatMessagesObject = myChatMessages[0];
            // console.log(myChatMessagesObject);
            return res.json(myChatMessagesObject);
        });
    }
    CheckExistingChatRoomMessages(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const myId = new mongoose_1.default.Types.ObjectId((_a = req.query.myId) === null || _a === void 0 ? void 0 : _a.toString());
            const id = new mongoose_1.default.Types.ObjectId((_b = req.query.id) === null || _b === void 0 ? void 0 : _b.toString());
            const myChatMessages = yield messagesRepository_1.default.checkExistingChatRoomMessages(myId, id); //:Array
            const myChatMessagesObject = myChatMessages[0];
            return res.json(myChatMessagesObject);
        });
    }
    GetLastMessage(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const myId = new mongoose_1.default.Types.ObjectId((_a = req.query.myId) === null || _a === void 0 ? void 0 : _a.toString());
            const myLastMessages = yield messagesRepository_1.default.getLastMessage(myId);
            for (const oneInstance of myLastMessages) {
                let otherId;
                for (const oneUser of oneInstance.users) {
                    if (oneUser._id.toString() !== myId.toString()) {
                        otherId = new mongoose_1.default.Types.ObjectId(oneUser._id);
                        const countBadge = yield messagesRepository_1.default.getCountBadge(myId, otherId);
                        if (countBadge.length !== 0) {
                            oneInstance.countBadge = countBadge[0].count;
                        }
                        else {
                            oneInstance.countBadge = 0;
                        }
                        break;
                    }
                }
            }
            return res.json(myLastMessages);
        });
    }
    AddMessage(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const myId = new mongoose_1.default.Types.ObjectId((_a = req.body.myId) === null || _a === void 0 ? void 0 : _a.toString());
            const id = new mongoose_1.default.Types.ObjectId((_b = req.body.id) === null || _b === void 0 ? void 0 : _b.toString());
            const message = req.body.message;
            messagesRepository_1.default.addMessage(myId, id, message)
                .then(result => res.sendStatus(200))
                .catch(error => res.send(error));
        });
    }
    AddRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstUser = req.body.chatRoom.users[0];
            const secondUser = req.body.chatRoom.users[1];
            return yield new Chat_1.default({ users: [firstUser, secondUser], messages: [] }).save();
        });
    }
    // async UpdateVisibleMessage(req: Request, res: Response, next: NextFunction) {
    //     const {chatMessage, oneMessage} = req.body;
    //     await Chat.findOneAndUpdate({_id: chatMessage._id, "messages._id": oneMessage._id}, {$set: {"messages.$.isVisible": true}});
    //     return res.sendStatus(200);
    // }
    UpdateVisibleAllMessages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { chatMessages, id, myId } = req.body;
            const chatObjectId = new mongoose_1.default.Types.ObjectId(chatMessages._id);
            const objectId = new mongoose_1.default.Types.ObjectId(id);
            yield Chat_1.default.updateOne({ _id: chatObjectId }, { $set: { 'messages.$[oneMessage].isVisible': true } }, { arrayFilters: [{ 'oneMessage.user': objectId }] });
            global.io.to(global.connectedUsers[myId]).emit('updateMessages');
            return res.sendStatus(200);
        });
    }
}
exports.default = new MessagesController();
