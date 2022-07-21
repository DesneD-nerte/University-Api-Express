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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var path_1 = require("path");
var User_1 = require("../models/User");
var FileController = /** @class */ (function () {
    function FileController() {
    }
    FileController.prototype.SaveImage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sampleFile, uploadPath, idUserImage, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.files || Object.keys(req.files).length === 0) {
                            if (!req.body.file) {
                                return [2 /*return*/, res.status(400).send('No files were uploaded.')];
                            }
                        }
                        if (req.files) {
                            sampleFile = req.files.file;
                        }
                        else {
                            sampleFile = req.body.file;
                        }
                        idUserImage = req.body.id + '.jpeg';
                        uploadPath = path_1["default"].join(__dirname, '/../images/usersAvatar/', idUserImage);
                        // Use the mv() method to place the file somewhere on your server
                        sampleFile.mv(uploadPath, function (err) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (err) {
                                        return [2 /*return*/, res.status(500).send(err)];
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        });
                        return [4 /*yield*/, User_1["default"].findOne({ _id: req.body.id })];
                    case 1:
                        currentUser = _a.sent();
                        if (currentUser.imageUri === undefined) {
                            currentUser.imageUri = "http://" + req.headers.host + "/avatar/" + req.body.id; //////////////////////////
                            currentUser.save();
                        }
                        res.send('File uploaded!');
                        return [2 /*return*/];
                }
            });
        });
    };
    FileController.prototype.LoadImage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idUser, files, uriImagePath;
            return __generator(this, function (_a) {
                idUser = req.params.id;
                files = fs.readdirSync('./images/usersAvatar');
                if (files.includes(idUser + ".jpeg")) {
                    uriImagePath = path_1["default"].join(__dirname, '/../images/usersAvatar/', idUser + ".jpeg");
                    res.sendFile(uriImagePath); //Отправка всего пути изображения с сервера
                }
                else {
                    res.sendStatus(400);
                }
                return [2 /*return*/];
            });
        });
    };
    FileController.prototype.LoadLoginImages = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, files, uriImagePath;
            return __generator(this, function (_a) {
                fileName = req.params.imageName;
                files = fs.readdirSync('./images/loginPage');
                if (files.includes("" + fileName)) {
                    uriImagePath = path_1["default"].join(__dirname, '/../images/loginPage/', "" + fileName);
                    res.sendFile(uriImagePath);
                }
                else {
                    res.sendStatus(400);
                }
                return [2 /*return*/];
            });
        });
    };
    FileController.prototype.LoadExcelTemplate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.download('./files/Шаблон_для_добавления_пользователей.xlsx');
                return [2 /*return*/];
            });
        });
    };
    return FileController;
}());
exports["default"] = new FileController();
