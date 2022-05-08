import ApiError from "../exceptions/apiError";
import {check} from "express-validator";

import markController from "../controllers/markController";

const {Router} = require('express');
const router = Router();

//  /api/marks
router.get('/', markController.getMarks);
router.post('/savenewcurrentlesson', markController.saveNewCurrentLesson);
router.post('/savenewcurrentlessonsarray', markController.saveNewArrayCurrentLessons);
router.put('/updatecurrentlesson', markController.UpdateCurrentLesson);



module.exports = router;