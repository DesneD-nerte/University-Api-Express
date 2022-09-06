import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fileService from "../services/fileService";

class FileController {

	async SaveImage (req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.files) {
				return res.status(400).send("No files were uploaded.");
			}

			const id = req.body.id;
			const sampleFile = req.files.file as UploadedFile;
			await fileService.SaveImage(id, sampleFile);

			res.send("File uploaded!");
		} catch(err) {
			next(err);
		}
	}

	async LoadImage (req: Request, res: Response, next: NextFunction) {
		try {
			const idUser = req.params.id;

			const uriImagePath = await fileService.LoadImage(idUser);
			res.sendFile(uriImagePath);
		} catch(err) {
			next(err);
		}
	}

	async LoadExcelTemplate (req: Request, res: Response, next: NextFunction) {
		try {
			res.download(path.resolve(__dirname, "../files/Шаблон_для_добавления_пользователей.xlsx"));
		} catch(err) {
			next(err);
		}
	}
}

export default new FileController();