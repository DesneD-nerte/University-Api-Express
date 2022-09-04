import { Router } from "express";
import messagesController from "../controllers/messagesController";

const router = Router();

//messages
router.get("/getChatRoomMessages", messagesController.GetMessages);
router.get("/checkExistingChatRoomMessages", messagesController.CheckExistingChatRoomMessages);
router.get("/getLastMessages", messagesController.GetLastMessages);
router.post("/addMessage", messagesController.AddMessage);
router.post("/addRoom", messagesController.AddRoom);
router.put("/updateVisibleAllMessages", messagesController.UpdateVisibleAllMessages);

export default router;