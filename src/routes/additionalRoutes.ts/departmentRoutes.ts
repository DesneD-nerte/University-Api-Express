import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";

const {Router} = require('express');
const router = Router();

//  /api/departments
router.get('/', UnitedAdditionalController.GetDepartments)

module.exports = router;