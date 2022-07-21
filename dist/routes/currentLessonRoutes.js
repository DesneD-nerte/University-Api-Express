"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lessonController_1 = __importDefault(require("../controllers/lessonController"));
const { Router } = require('express');
const router = Router();
//  /currentlessons
router.get('/', lessonController_1.default.GetCurrentLessons);
router.post('/savenewcurrentlesson', lessonController_1.default.SaveNewCurrentLesson);
router.post('/savenewcurrentlessonsarray', lessonController_1.default.SaveNewArrayCurrentLessons);
router.get('/lessongroup', lessonController_1.default.GetCurrentLessons);
router.put('/updateCurrentLesson', lessonController_1.default.UpdateCurrentLesson);
router.put('/schedulercurrentlessons', lessonController_1.default.GetSchedulerFormCurrentLessons);
module.exports = router;
