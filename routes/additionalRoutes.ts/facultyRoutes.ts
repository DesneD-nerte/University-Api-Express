import ApiError from "../../exceptions/apiError";
import {check} from "express-validator";
import UnitedAdditionalController from "../../controllers/additionalController.ts/UnitedAdditionalController";

const {Router} = require('express');
const router = Router();

//  /api/faculties
router.get('/', UnitedAdditionalController.getFaculties)

module.exports = router;