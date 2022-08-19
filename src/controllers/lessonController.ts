import { Request, Response, NextFunction } from "express";
import LessonRepository from "../repositories/lessonRepository";
import lessonService from "../services/lessonService";

class LessonController {
    async GetCurrentLessons (req: Request, res: Response, next: NextFunction) {
        try {
            const lessons = await lessonService.GetCurrentLessons();

            return res.json(lessons);

        } catch(err) {
            next(err);
        }
    }

    async SaveNewCurrentLesson (req: Request, res: Response, next: NextFunction) {
        try {
            const currentLesson = await lessonService.SaveNewCurrentLesson(req.body);

            return res.json(currentLesson);
        } catch (err) {
            next(err);
        }
    }

    async SaveNewArrayCurrentLessons (req: Request, res: Response, next: NextFunction) {
        try {
            const arrayCurrentLessons = await lessonService.SaveNewArrayCurrentLessons(req.body);
            
            return res.json(arrayCurrentLessons);
        } catch (err) {
            next(err);
        }
    }

    async UpdateCurrentLesson (req: Request, res: Response, next: NextFunction) {
        try {
            const updatedCurrentLesson = await lessonService.UpdateCurrentLesson(req.body);

            return res.json(updatedCurrentLesson);
        } catch (err) {
            next(err);
        }
    }
}

export default new LessonController();