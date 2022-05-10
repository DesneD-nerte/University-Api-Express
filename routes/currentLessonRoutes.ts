import ApiError from "../exceptions/apiError";
import {check} from "express-validator";

import lessonController from "../controllers/lessonController";

const {Router} = require('express');
const router = Router();

//  /api/currentlessons
router.get('/', lessonController.GetCurrentLessons)
router.post('/savenewcurrentlesson', lessonController.SaveNewCurrentLesson);
router.post('/savenewcurrentlessonsarray', lessonController.SaveNewArrayCurrentLessons);
router.get('/lessongroup', lessonController.GetCurrentLessons)
router.put('/updateCurrentLesson', lessonController.UpdateCurrentLesson)


module.exports = router;