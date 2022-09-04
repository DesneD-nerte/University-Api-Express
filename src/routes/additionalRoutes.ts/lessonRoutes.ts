import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";
import { Router } from "express";

const router = Router();

//  /api/lessons
router.get("/", UnitedAdditionalController.GetLessons);

export default router;