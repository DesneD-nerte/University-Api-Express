import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";

const {Router} = require('express');
const router = Router();

//  /api/faculties
router.get('/', UnitedAdditionalController.GetFaculties)

module.exports = router;