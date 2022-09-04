import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";
import { Router } from "express";

const router = Router();

//  /api/roles
router.get("/", UnitedAdditionalController.GetRoles);

export default router;