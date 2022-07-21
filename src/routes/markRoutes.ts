import markController from "../controllers/markController";

const {Router} = require('express');
const router = Router();

//  /marks
router.get('/', markController.GetMarks);
router.post('/savenewcurrentlesson', markController.SaveNewCurrentLesson);
router.post('/savenewcurrentlessonsarray', markController.SaveNewArrayCurrentLessons);
router.put('/updatecurrentlesson', markController.UpdateCurrentLesson);



module.exports = router;