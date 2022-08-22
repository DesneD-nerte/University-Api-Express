import { CreateCurrentLessonDto } from "../dto/lesson/createCurrentLessonDto";
import { UpdateCurrentLessonDto } from "../dto/lesson/updateCurrentLessonDto";
import CurrentLesson from "../models/CurrentLesson";
import lessonRepository from "../repositories/lessonRepository";

class LessonService {
    async GetCurrentLessons () {
        const lessons = await lessonRepository.GetCurrentLessons();

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

        // return await currentLesson.save();
        return await lessonRepository.SaveNewCurrentLesson(currentLesson);
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

        const addedCurrentLessons = await lessonRepository.SaveNewArrayCurrentLessons(arrayCurrentLessons);

        return addedCurrentLessons;
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

        const updatedCurrentLesson = await lessonRepository.UpdateCurrentLesson(newCurrentLessons);
        
        return updatedCurrentLesson;
    }
}

export default new LessonService();