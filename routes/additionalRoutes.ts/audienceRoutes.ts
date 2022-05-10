import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";

const {Router} = require('express');
const router = Router();

//  /api/audiences
router.get('/', UnitedAdditionalController.GetAudiences)

module.exports = router;