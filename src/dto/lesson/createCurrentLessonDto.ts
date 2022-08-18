export class CreateCurrentLessonDto {
    lessonNameId: string;
    teacherId: string;
    classRoomId: string;
    startDate: Date
    endDate: Date
    groupId: string;

    constructor(lessonNameId: string, teacherId: string, classRoomId: string, startDate: Date, endDate: Date, groupId: string) {
        this.lessonNameId = lessonNameId;
        this.teacherId = teacherId;
        this.classRoomId = classRoomId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.groupId = groupId;
    }
}