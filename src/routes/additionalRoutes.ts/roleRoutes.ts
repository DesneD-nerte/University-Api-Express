import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";

const {Router} = require('express');
const router = Router();

//  /api/roles
router.get('/', UnitedAdditionalController.GetRoles)

export default router