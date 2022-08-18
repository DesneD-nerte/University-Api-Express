import { CreateCurrentLessonDto } from "../dto/lesson/createCurrentLessonDto";
import { UpdateCurrentLessonDto } from "../dto/lesson/updateCurrentLessonDto";
import CurrentLesson from "../models/CurrentLesson";
import LessonRepository from "../repositories/lessonRepository";

class LessonService {
    async GetCurrentLessons () {
        const lessons = await LessonRepository.getCurrentLessons();

        return lessons;
    }

    async SaveNewCurrentLesson (createCurrentLessonDto: CreateCurrentLessonDto) {
        const currentLesson = new CurrentLesson({
            name: createCurrentLessonDto.lessonNameId,
            teachers: createCurrentLessonDto.teacherId,
            classroom: createCurrentLessonDto.classRoomId,
            beginDate: createCurrentLessonDto.startDate,
            endDate: createCurrentLessonDto.endDate, 
            group: createCurrentLessonDto.groupId
        })

        return await currentLesson.save();
    }

    async SaveNewArrayCurrentLessons (arrayCreateCurrentLessonDto: Array<CreateCurrentLessonDto>) {
        const arrayCurrentLessons = [];

        for (const oneCurrentLesson of arrayCreateCurrentLessonDto) {
            const currentLesson = new CurrentLesson({
                name: oneCurrentLesson.lessonNameId,
                teachers: oneCurrentLesson.teacherId,
                classroom: oneCurrentLesson.classRoomId,
                beginDate: oneCurrentLesson.startDate,
                endDate: oneCurrentLesson.endDate,
                group: oneCurrentLesson.groupId
            });

            arrayCurrentLessons.push(currentLesson);
        }

        return await CurrentLesson.insertMany(arrayCurrentLessons)
    }

    async UpdateCurrentLesson (updateCurrentLessonDto: UpdateCurrentLessonDto) {

        const newCurrentLessons = new CurrentLesson({
            _id: updateCurrentLessonDto._id,
            name: updateCurrentLessonDto.lessonNameId,
            teachers: updateCurrentLessonDto.teacherId,
            classroom: updateCurrentLessonDto.classRoomId,
            beginDate: updateCurrentLessonDto.startDate,
            endDate: updateCurrentLessonDto.endDate,
            group: updateCurrentLessonDto.groupId
        })

        return await CurrentLesson.findOneAndUpdate({_id: newCurrentLessons._id}, newCurrentLessons);
    }

    // async GetSchedulerFormCurrentLessons () {
    //     const { data } = req.body;

    //     const result = await LessonRepository.getSchedulerCurrentLessons(data);
        
    //     return res.json(result);
    // }
}

export default new LessonService();