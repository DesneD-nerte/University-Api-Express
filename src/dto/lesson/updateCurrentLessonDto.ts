export class UpdateCurrentLessonDto {
    _id: string;
    lessonNameId: string;
    teacherId: string[];
    classRoomId: string;
    startDate: Date
    endDate: Date
    groupId: string;

    constructor(_id: string, lessonNameId: string, teacherId: string[], classRoomId: string, startDate: Date, endDate: Date, groupId: string) {
        this._id = _id;
        this.lessonNameId = lessonNameId;
        this.teacherId = teacherId;
        this.classRoomId = classRoomId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.groupId = groupId;
    }
}