import userController from "../controllers/userController";
import Router from "express";
import fileController from "../controllers/fileController";

const router = Router();

// /users/
router.get('/students/:id', userController.GetStudentById)
router.get('/students', userController.GetStudents);
router.get('/:groupId/students', userController.GetStudentsByGroupId);

router.get('/teachers', userController.GetTeachers);

router.get('/all', userController.GetAll);

// router.get('/:id/avatar/:avatarName', fileController.LoadImage);


module.exports = router;