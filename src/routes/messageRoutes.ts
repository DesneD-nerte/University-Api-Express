import Router from "express";
import messagesController from "../controllers/messagesController";

const router = Router();

//messages
router.get('/getChatRoomMessages', messagesController.GetMessages);
router.get('/checkExistingChatRoomMessages', messagesController.CheckExistingChatRoomMessages);
router.get('/getLastMessages', messagesController.GetLastMessage);
router.post('/addMessage', messagesController.AddMessage);
router.post('/addRoom', messagesController.AddRoom);
//router.put('/updateVisibleMessage', messagesController.UpdateVisibleMessage);
router.put('/updateVisibleAllMessages', messagesController.UpdateVisibleAllMessages);


module.exports = router;