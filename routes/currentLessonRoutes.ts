import lessonController from "../controllers/lessonController";

const {Router} = require('express');
const router = Router();

//  /currentlessons
router.get('/', lessonController.GetCurrentLessons)
router.post('/savenewcurrentlesson', lessonController.SaveNewCurrentLesson);
router.post('/savenewcurrentlessonsarray', lessonController.SaveNewArrayCurrentLessons);
router.get('/lessongroup', lessonController.GetCurrentLessons)
router.put('/updateCurrentLesson', lessonController.UpdateCurrentLesson)
router.put('/schedulercurrentlessons', lessonController.GetSchedulerFormCurrentLessons);


module.exports = router;