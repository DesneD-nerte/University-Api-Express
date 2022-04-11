import ApiError from "../../exceptions/apiError";
import {check} from "express-validator";
import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";

const {Router} = require('express');
const router = Router();

//  /api/audiences
router.get('/', UnitedAdditionalController.getAudiences)

module.exports = router;