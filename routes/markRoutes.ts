import ApiError from "../exceptions/apiError";
import {check} from "express-validator";

import markController from "../controllers/markController";

const {Router} = require('express');
const router = Router();

//  /api/marks
router.get('/', markController.GetMarks);
router.post('/savenewcurrentlesson', markController.SaveNewCurrentLesson);
router.post('/savenewcurrentlessonsarray', markController.SaveNewArrayCurrentLessons);
router.put('/updatecurrentlesson', markController.UpdateCurrentLesson);



module.exports = router;