import newsController from "../controllers/newsController";
import { Router } from "express";
const router = Router();

//  '/news'
router.get("/getnews", newsController.GetNews);
router.post("/postnews", newsController.PostNewNews);
router.delete("/deletenews", newsController.DeleteNews);

export default router;