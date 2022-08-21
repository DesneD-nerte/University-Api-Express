import { UploadedFile } from "express-fileupload";
import path from "path";
import userService from "./userService";
import config from '../config/config';
import fs from "fs";

class FileService {
    async SaveImage (id: string, sampleFile: UploadedFile) {
        const idUserImage = id + '.jpeg';
        const uploadPath = path.join(__dirname, '/../images/usersAvatar/', idUserImage);

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function(err: Error) {
            if (err) {
                throw new Error("Ошибка размещения изображения на сервере");
            }
        });
       

        const currentUser = await userService.GetUserById({id: id});
        if (currentUser && currentUser.imageUri === undefined) {
            currentUser.imageUri = `${config.host}/avatar/${id}`;

            currentUser.save();
        }

        return currentUser;
    }

    LoadImage (id: string) {
        const files = fs.readdirSync(path.join(__dirname, '/../images/usersAvatar'));

        if(files.includes(`${id}.jpeg`)) {
            const uriImagePath = path.join(__dirname, '/../images/usersAvatar/', `${id}.jpeg`);
            
            return uriImagePath; 
        } else {
            throw Error('Изображение отсутствует на сервере');
        }
    }

    LoadLoginImages (fileName: string) {
        const files = fs.readdirSync(path.join(__dirname, '/../images/loginPage'));

        if(files.includes(`${fileName}`)) {
            const uriImagePath = path.join(__dirname, '/../images/loginPage/', `${fileName}`);
            
            return uriImagePath;
        } else {
            throw Error('Изображение отсутствует на сервере');
        }
    }
}

export default new FileService();