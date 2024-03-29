import lessonController from "../controllers/lessonController";
import { Router } from "express";

const router = Router();

//  /currentlessons
router.get("/", lessonController.GetCurrentLessons);
router.post("/savenewcurrentlesson", lessonController.SaveNewCurrentLesson);
router.post("/savenewcurrentlessonsarray", lessonController.SaveNewArrayCurrentLessons);
// router.get('/lessongroup', lessonController.GetCurrentLessons)
router.put("/updateCurrentLesson", lessonController.UpdateCurrentLesson);

export default router;