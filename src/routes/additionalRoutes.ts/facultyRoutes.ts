import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";
import { Router } from "express";

const router = Router();

//  /api/faculties
router.get("/", UnitedAdditionalController.GetFaculties);

export default router;