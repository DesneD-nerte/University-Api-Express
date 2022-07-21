"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesController_1 = __importDefault(require("../controllers/messagesController"));
const router = (0, express_1.default)();
//messages
router.get('/getChatRoomMessages', messagesController_1.default.GetMessages);
router.get('/checkExistingChatRoomMessages', messagesController_1.default.CheckExistingChatRoomMessages);
router.get('/getLastMessages', messagesController_1.default.GetLastMessage);
router.post('/addMessage', messagesController_1.default.AddMessage);
router.post('/addRoom', messagesController_1.default.AddRoom);
//router.put('/updateVisibleMessage', messagesController.UpdateVisibleMessage);
router.put('/updateVisibleAllMessages', messagesController_1.default.UpdateVisibleAllMessages);
module.exports = router;
