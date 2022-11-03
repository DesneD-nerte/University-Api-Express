import { Request, Response, NextFunction } from "express";
import { CreateCurrentLessonDto } from "../dto/lesson/createCurrentLessonDto";
import { UpdateCurrentLessonDto } from "../dto/lesson/updateCurrentLessonDto";
import lessonService from "../services/lessonService";

class LessonController {
	async GetCurrentLessons(req: Request, res: Response, next: NextFunction) {
		try {
			const lessons = await lessonService.GetCurrentLessons();
			return res.json(lessons);
		} catch (err) {
			next(err);
		}
	}

	async SaveNewCurrentLesson(req: Request<any, any, CreateCurrentLessonDto, any>, res: Response, next: NextFunction) {
		try {
			const createCurrentLessonDto = req.body;
			const currentLesson = await lessonService.SaveNewCurrentLesson(createCurrentLessonDto);

			return res.json(currentLesson);
		} catch (err) {
			next(err);
		}
	}

	async SaveNewArrayCurrentLessons(
		req: Request<any, any, CreateCurrentLessonDto[], any>,
		res: Response,
		next: NextFunction
	) {
		try {
			const arrayCreateCurrentLessonDto = req.body;
			const arrayCurrentLessons = await lessonService.SaveNewArrayCurrentLessons(arrayCreateCurrentLessonDto);

			return res.json(arrayCurrentLessons);
		} catch (err) {
			next(err);
		}
	}

	async UpdateCurrentLesson(req: Request<any, any, UpdateCurrentLessonDto, any>, res: Response, next: NextFunction) {
		try {
			const updateCurrentLessonDto = req.body;
			const updatedCurrentLesson = await lessonService.UpdateCurrentLesson(updateCurrentLessonDto);

			return res.json(updatedCurrentLesson);
		} catch (err) {
			next(err);
		}
	}
}

export default new LessonController();
