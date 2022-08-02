"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("../models/User"));
class FileController {
    SaveImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let sampleFile;
            let uploadPath;
            let idUserImage;
            if (!req.files || Object.keys(req.files).length === 0) {
                if (!req.body.file) {
                    return res.status(400).send('No files were uploaded.');
                }
            }
            if (req.files) {
                sampleFile = req.files.file;
            }
            else {
                sampleFile = req.body.file;
            }
            idUserImage = req.body.id + '.jpeg';
            uploadPath = path_1.default.join(__dirname, '/../images/usersAvatar/', idUserImage);
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv(uploadPath, function (err) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });
            });
            const currentUser = yield User_1.default.findOne({ _id: req.body.id });
            if (currentUser.imageUri === undefined) {
                currentUser.imageUri = `http://${req.headers.host}/avatar/${req.body.id}`; //////////////////////////
                currentUser.save();
            }
            res.send('File uploaded!');
        });
    }
    LoadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.params.id;
            // const files = fs.readdirSync('./images/usersAvatar');
            const files = fs.readdirSync(path_1.default.join(__dirname, '/../images/usersAvatar'));
            if (files.includes(`${idUser}.jpeg`)) {
                const uriImagePath = path_1.default.join(__dirname, '/../images/usersAvatar/', `${idUser}.jpeg`);
                res.sendFile(uriImagePath); //Отправка всего пути изображения с сервера
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    LoadLoginImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = req.params.imageName;
            // const files = fs.readdirSync('./images/loginPage');
            const files = fs.readdirSync(path_1.default.join(__dirname, '/../images/loginPage'));
            if (files.includes(`${fileName}`)) {
                const uriImagePath = path_1.default.join(__dirname, '/../images/loginPage/', `${fileName}`);
                res.sendFile(uriImagePath);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    LoadExcelTemplate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.download('./files/Шаблон_для_добавления_пользователей.xlsx');
        });
    }
}
exports.default = new FileController();
