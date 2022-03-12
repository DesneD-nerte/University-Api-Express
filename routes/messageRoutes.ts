import Router from "express";
import messagesController from "../controllers/messagesController";

const router = Router();

//messages
router.get('/getChatRoomMessages', messagesController.GetMessages);
router.get('/getLastMessages', messagesController.GetLastMessage);
//router.post('/addMessage', messagesController.AddMessage);

module.exports = router;