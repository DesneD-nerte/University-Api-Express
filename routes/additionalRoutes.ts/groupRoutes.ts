import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";

const {Router} = require('express');
const router = Router();

//  /api/groups
router.get('/', UnitedAdditionalController.GetGroups)


module.exports = router;