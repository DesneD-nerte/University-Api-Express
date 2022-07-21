"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnitedAdditionalController_1 = __importDefault(require("../../controllers/additionalController.ts/UnitedAdditionalController"));
const { Router } = require('express');
const router = Router();
//  /api/departments
router.get('/', UnitedAdditionalController_1.default.GetDepartments);
module.exports = router;
