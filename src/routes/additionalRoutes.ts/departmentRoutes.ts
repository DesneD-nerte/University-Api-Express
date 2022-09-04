import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";
import { Router } from "express";

const router = Router();

//  /api/departments
router.get("/", UnitedAdditionalController.GetDepartments);

export default router;