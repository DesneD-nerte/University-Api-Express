import markController from "../controllers/markController";
import { Router } from "express";

const router = Router();

//  /marks
router.get("/", markController.GetMarks);
router.post("/savenewcurrentlesson", markController.SaveNewCurrentLesson);
router.post("/savenewcurrentlessonsarray", markController.SaveNewArrayCurrentLessons);
router.put("/updatecurrentlesson", markController.UpdateCurrentLesson);

export default router;