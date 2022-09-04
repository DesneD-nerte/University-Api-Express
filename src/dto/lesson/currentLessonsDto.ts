import { IAudience, IGroup, ILesson } from "../../types/mainTypes";

export class CurrentLessonDto {
	_id: string;
	name: ILesson;
	teachers: string[];
	beginDate: Date;
	endDate: Date;
	classRoom: IAudience;
	group: IGroup;

	constructor(_id: string, name: ILesson, teachers: string[], beginDate: Date, endDate: Date, classRoom: IAudience, group: IGroup) {
		this._id = _id;
		this.name = name;
		this.teachers = teachers;
		this.beginDate = beginDate;
		this.endDate = endDate;
		this.classRoom = classRoom;
		this.group = group;
	}
}