"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const News_1 = __importDefault(require("../models/News"));
class NewsController {
    //SORT {createdAt: -1} Задом наперед приходят данные
    GetNews(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Get News method.");
            const limit = Number.parseInt((_a = req.query.limit) === null || _a === void 0 ? void 0 : _a.toString()) || 10;
            const page = Number.parseInt((_b = req.query.page) === null || _b === void 0 ? void 0 : _b.toString()) || 1;
            const massiveNews = yield News_1.default.find({}).sort({ createdAt: -1 })
                .limit(limit)
                .skip(limit * (page - 1)); //Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу
            return res.json(massiveNews);
        });
    }
    GetAllNews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const allNews = yield News_1.default.find({}).sort({ createdAt: -1 });
            return res.json(allNews);
        });
    }
    PostNewNews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newNews = req.body.data.newNews;
            News_1.default.create(newNews)
                .then(response => {
                res.sendStatus(200);
            })
                .catch(error => {
                res.sendStatus(400);
            });
        });
    }
    DeleteNews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayToDelete = req.body.oldNews;
            for (let i = 0; i < arrayToDelete.length; i++) {
                yield News_1.default.deleteOne(arrayToDelete[i]);
            }
            return res.sendStatus(200);
        });
    }
}
exports.default = new NewsController();
