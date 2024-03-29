import { UploadedFile } from "express-fileupload";
import path from "path";
import userService from "./userService";
import config from "../config/config";
import fs from "fs";

class FileService {
	//Need use something like Google Cloud Storage for serving dynamic files
	SaveImage(id: string, sampleFile: UploadedFile) {
		const idUserImage = id + ".jpeg";
		const uploadPath = path.resolve(__dirname, "../images/usersAvatar", idUserImage);

		// Use the mv() method to place the file somewhere on your server
		const filePromise = new Promise((resolve, reject) => {
			sampleFile.mv(uploadPath, function (err: Error) {
				if (err) {
					reject("Ошибка размещения изображения на сервере");
				} else {
					resolve("Ok");
				}
			});
		});
		return filePromise
			.then(async () => {
				const currentUser = await userService.GetUserById({ id: id });
				if (currentUser && currentUser.imageUri === undefined) {
					currentUser.imageUri = `${config.host}/avatar/${id}`;

					await currentUser.save();
				}
			})
			.catch((err) => {
				throw new Error(err);
			});
	}

	async LoadImage(id: string) {
		const developPath = path.resolve(__dirname, "../images/usersAvatar");
		const files = await fs.promises.readdir(developPath);

		if (files.includes(`${id}.jpeg`)) {
			return path.resolve(__dirname, `../images/usersAvatar/${id}.jpeg`);
		} else {
			throw new Error("Изображение отсутствует на сервере");
		}
	}
}

export default new FileService();
