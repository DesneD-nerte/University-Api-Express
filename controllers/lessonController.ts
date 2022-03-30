import { Request, Response, NextFunction } from "express";
import Lesson from '../models/Lesson';

class LessonController {
    async getCurrentLessons (req: Request, res: Response, next: NextFunction) {
        
        const lessons = await Lesson.find({})
        console.log(lessons);
        return res.json(lessons);
    }
}

export default new LessonController();