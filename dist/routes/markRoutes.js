"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markController_1 = __importDefault(require("../controllers/markController"));
const { Router } = require('express');
const router = Router();
//  /marks
router.get('/', markController_1.default.GetMarks);
router.post('/savenewcurrentlesson', markController_1.default.SaveNewCurrentLesson);
router.post('/savenewcurrentlessonsarray', markController_1.default.SaveNewArrayCurrentLessons);
router.put('/updatecurrentlesson', markController_1.default.UpdateCurrentLesson);
module.exports = router;
