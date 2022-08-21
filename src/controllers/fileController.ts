import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";
import path from "path";
import User from "../models/User";
import fileService from "../services/fileService";

class FileController {

    async SaveImage (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.files) {
                return res.status(400).send('No files were uploaded.');
            }

            const id = req.body.id;
            const sampleFile = req.files.file as UploadedFile;
            const updatedImageUser = await fileService.SaveImage(id, sampleFile);

            res.send('File uploaded!');
        } catch(err) {
            next(err);
        }
    }

    LoadImage (req: Request, res: Response, next: NextFunction) {
        try {
            const idUser = req.params.id;

            const uriImagePath = fileService.LoadImage(idUser);
            res.sendFile(uriImagePath);
        } catch(err) {
            next(err);
        }
    }

    async LoadLoginImages (req: Request, res: Response, next: NextFunction) {
        try {
            const fileName = req.params.imageName;

            const imagePath = fileService.LoadLoginImages(fileName);
            return res.sendFile(imagePath);
        } catch(err) {
            next(err);
        }
    }

    async LoadExcelTemplate (req: Request, res: Response, next: NextFunction) {
        try {
            res.download('./files/Шаблон_для_добавления_пользователей.xlsx');
        } catch(err) {
            next(err);
        }
    }
}

export default new FileController();