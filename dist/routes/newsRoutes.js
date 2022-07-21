"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsController_1 = __importDefault(require("../controllers/newsController"));
const { Router } = require('express');
const router = Router();
//  '/news'
router.get('/getnews', newsController_1.default.GetNews);
router.get('/getallnews', newsController_1.default.GetAllNews);
router.post('/postnews', newsController_1.default.PostNewNews);
router.delete('/deletenews', newsController_1.default.DeleteNews);
module.exports = router;
