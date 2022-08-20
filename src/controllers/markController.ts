import { Request, Response, NextFunction } from "express";
import Mark from "../models/Mark";
import markRepository from "../repositories/markRepository";
import { CurrentLessonDto } from "../dto/lesson/currentLessonsDto";
import markService from "../services/markService";

class MarkController {
    async GetMarks (req: Request, res: Response, next: NextFunction) {
        try {
            const marks = await markRepository.GetMarks();
            console.log(marks);

            return res.json(marks);

        } catch(err) {
            next(err);
        }
    }

    async SaveNewCurrentLesson (req: Request<any, any, CurrentLessonDto, any>, res: Response, next: NextFunction) {
        try {
            const newCurrentLesson = req.body;
            await markService.SaveNewCurrentLesson(newCurrentLesson);

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async SaveNewArrayCurrentLessons(req: Request<any, any, CurrentLessonDto[],any>, res: Response, next: NextFunction) {
        try {
            const arrayNewCurrentLesson = req.body;
            await markService.SaveNewArrayCurrentLessons(arrayNewCurrentLesson);

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async UpdateCurrentLesson(req: Request, res: Response, next: NextFunction) {
        try {
            const existedMark = req.body;
            console.log(existedMark);
            await Mark.findOneAndUpdate({_id: existedMark._id}, {allCurrentLessons: existedMark.allCurrentLessons});

            return res.sendStatus(200);
        } catch(err) {
            next(err);
        }
    }
}

export default new MarkController();