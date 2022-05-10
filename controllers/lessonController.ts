import { Request, Response, NextFunction } from "express";
import CurrentLessons from "../models/CurrentLessons";
import LessonRepository from "../repositories/lessonRepository";

class LessonController {
    async GetCurrentLessons (req: Request, res: Response, next: NextFunction) {
        try {
            const lessons = await LessonRepository.getCurrentLessons();

            return res.json(lessons);

        } catch(e) {
            console.log(e);

            return res.send(e);
        }
    }

    async SaveNewCurrentLesson (req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        const currentLesson = new CurrentLessons({
            name: body.lessonNameId,
            teacher: body.teacherId,
            classroom: body.classRoomId,
            beginDate: body.startDate,
            endDate: body.endDate, 
            group: body.groupId
        })

        await currentLesson.save();
        
        return res.json(currentLesson);
    }

    async SaveNewArrayCurrentLessons (req: Request, res: Response, next: NextFunction) {
        const arrayBody = req.body;

        const arrayCurrentLessons = [];

        for (const oneCurrentLesson of arrayBody) {
            const currentLesson = new CurrentLessons({
                name: oneCurrentLesson.lessonNameId,
                teacher: oneCurrentLesson.teacherId,
                classroom: oneCurrentLesson.classRoomId,
                beginDate: oneCurrentLesson.startDate,
                endDate: oneCurrentLesson.endDate,
                group: oneCurrentLesson.groupId
            });

            arrayCurrentLessons.push(currentLesson);
        }

        await CurrentLessons.insertMany(arrayCurrentLessons)
        
        return res.json(arrayCurrentLessons);
    }

    async UpdateCurrentLesson (req: Request, res: Response, next: NextFunction) {
        const updatedCurrentLesson = req.body;

        const newCurrentLessons = new CurrentLessons({
            _id: updatedCurrentLesson._id,
            name: updatedCurrentLesson.lessonNameId,
            teacher: updatedCurrentLesson.teacherId,
            classroom: updatedCurrentLesson.classRoomId,
            beginDate: updatedCurrentLesson.startDate,
            endDate: updatedCurrentLesson.endDate,
            group: updatedCurrentLesson.groupId
        })
        await CurrentLessons.findOneAndUpdate({_id: newCurrentLessons._id}, newCurrentLessons);

        return res.json(updatedCurrentLesson);
    }
}

export default new LessonController();