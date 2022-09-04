import userController from "../controllers/userController";
import { Router } from "express";

const router = Router();

// /users/
router.get("/id", userController.GetUserById);
router.get("/students", userController.GetStudents);
router.get("/:groupId/students", userController.GetStudentsByGroupId);

router.get("/teachers", userController.GetTeachers);

router.get("/allButMe", userController.GetAllButMe);

export default router;