import { Request, Response, NextFunction } from "express";
import CurrentLessons from "../models/CurrentLessons";
import LessonRepository from "../repositories/lessonRepository";

class LessonController {
    async getCurrentLessons (req: Request, res: Response, next: NextFunction) {
        try {
            const lessons = await LessonRepository.getCurrentLessons();
            console.log(lessons);

            return res.json(lessons);

        } catch(e) {
            console.log(e);

            return res.send(e);
        }
    }

    async saveNewCurrentLesson (req: Request, res: Response, next: NextFunction) {
        const body = req.body;
        console.log(body);
        const currentLesson = new CurrentLessons({name: body.lessonNameId, teacher: body.teacherId, classroom: body.classRoomId, beginDate: body.startDate, endDate: body.endDate, group: body.groupId})
        await currentLesson.save();

        return res.sendStatus(200);
    }

    // async getLessonGroup (req: Request, res: Response, next: NextFunction) {
        
    //     const lessons = await Lesson.find({})
    //     console.log(lessons);
    //     return res.json(lessons);
    // }
}

export default new LessonController();