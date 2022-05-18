import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import fs from 'fs';
import path from "path";
import User from "../models/User";

class FileController {

    async SaveImage (req: Request, res: Response, next: NextFunction) {
        let sampleFile: UploadedFile;
        let uploadPath: string;
        let idUserImage: string;

        if (!req.files || Object.keys(req.files).length === 0) {
            if(!req.body.file) {
                return res.status(400).send('No files were uploaded.');
            }
        }
        
        if(req.files) {
            sampleFile = req.files.file as UploadedFile;
        } else {
            sampleFile = req.body.file as UploadedFile;
        }

        idUserImage = req.body.id + '.jpeg';
        uploadPath = path.join(__dirname, '/../images/usersAvatar/', idUserImage);

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, async function(err) {
            if (err) {
                return res.status(500).send(err);
            }
        });
       

        const currentUser = await User.findOne({_id: req.body.id});
        if (currentUser.imageUri === undefined) {
            currentUser.imageUri = `http://${req.headers.host}/avatar/${req.body.id}`;//////////////////////////

            currentUser.save();
        }

        res.send('File uploaded!');
    }

    async LoadImage (req: Request, res: Response, next: NextFunction) {
        const idUser = req.params.id;

        const files = fs.readdirSync('./images/usersAvatar');
        if(files.includes(`${idUser}.jpeg`)) {
            const uriImagePath = path.join(__dirname, '/../images/usersAvatar/', `${idUser}.jpeg`);
            
            res.sendFile(uriImagePath);//Отправка всего пути изображения с сервера
        } else {
            res.sendStatus(400);
        }
    }

    async LoadLoginImages (req: Request, res: Response, next: NextFunction) {
        const fileName = req.params.imageName;

        const files = fs.readdirSync('./images/loginPage');
        if(files.includes(`${fileName}`)) {
            const uriImagePath = path.join(__dirname, '/../images/loginPage/', `${fileName}`);
            
            res.sendFile(uriImagePath);
        } else {
            res.sendStatus(400);
        }
    }

    async LoadExcelTemplate (req: Request, res: Response, next: NextFunction) {
        res.download('./files/Шаблон_для_добавления_пользователей.xlsx');
    }
}

export default new FileController();