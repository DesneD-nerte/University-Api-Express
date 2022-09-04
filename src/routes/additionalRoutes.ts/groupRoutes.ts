import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";
import { Router } from "express";

const router = Router();

//  /api/groups
router.get("/", UnitedAdditionalController.GetGroups);


export default router;