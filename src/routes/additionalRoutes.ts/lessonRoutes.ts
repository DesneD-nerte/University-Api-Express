import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";

const {Router} = require('express');
const router = Router();

//  /api/lessons
router.get('/', UnitedAdditionalController.GetLessons)

module.exports = router;