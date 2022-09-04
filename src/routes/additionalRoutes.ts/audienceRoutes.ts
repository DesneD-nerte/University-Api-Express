import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";
import { Router } from "express";

const router = Router();

//  /api/audiences
router.get("/", UnitedAdditionalController.GetAudiences);

export default router;