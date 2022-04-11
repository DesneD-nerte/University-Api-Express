import ApiError from "../exceptions/apiError";
import {check} from "express-validator";

import lessonController from "../controllers/lessonController";

const {Router} = require('express');
const router = Router();

//  /api/currentlessons
router.get('/', lessonController.getCurrentLessons)
router.post('/savenewcurrentlesson', lessonController.saveNewCurrentLesson);
router.get('/lessongroup', lessonController.getCurrentLessons)


module.exports = router;