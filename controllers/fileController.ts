import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import fs from 'fs';
import path from "path";

class FileController {
    async SaveImage (req: Request, res: Response, next: NextFunction) {
        let sampleFile: UploadedFile;
        let uploadPath;
        let idUserImage;

        if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
        }
        
        sampleFile = req.files.file as UploadedFile;
        idUserImage = req.body.id + '.jpeg';
        uploadPath = path.join(__dirname, '/../images/usersAvatar/', idUserImage);

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);
    
        res.send('File uploaded!');
        });
    }

    async LoadImage (req: Request, res: Response, next: NextFunction) {
        const idUser = req.params.id;
        const fileName = req.params.avatarName;

        //const uriImagePath

        const files = fs.readdirSync('./images/usersAvatar');
        if(files.includes(`${fileName}`)) {
            const uriImagePath = path.join(__dirname, '/../images/usersAvatar/', `${fileName}`);
            
            console.log(uriImagePath);
            res.sendFile(uriImagePath);//Отправка всего пути изображения с сервера
        } else {
            res.sendStatus(400);
        }
    }
}

export default new FileController();
