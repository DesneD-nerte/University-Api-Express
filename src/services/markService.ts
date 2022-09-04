import { HydratedDocument } from "mongoose";
import { CurrentLessonDto } from "../dto/lesson/currentLessonsDto";
import CurrentLesson from "../models/CurrentLesson";
import Mark from "../models/Mark";
import markRepository from "../repositories/markRepository";
import { ICurrentLesson, IMark, IUser } from "../types/modelsTypes";
import userService from "./userService";

class MarkService {
	async GetMarks () {
		const marks = await markRepository.GetMarks();
        
		return marks;
	}

	async SaveNewCurrentLesson(newCurrentLessonDto: CurrentLessonDto) {
		const newCurrentLesson = new CurrentLesson({
			_id: newCurrentLessonDto._id,
			name: newCurrentLessonDto.name,
			teachers: newCurrentLessonDto.teachers,
			beginDate: newCurrentLessonDto.beginDate,
			endDate: newCurrentLessonDto.endDate,
			classRoom: newCurrentLessonDto.classRoom,
			group: newCurrentLessonDto.group,
		});
        
		const arrayOneGroupStudents = await userService.GetStudentsByGroupId({groupId: newCurrentLessonDto.group._id});

		await this.saveEveryStudent(arrayOneGroupStudents, newCurrentLessonDto, newCurrentLesson);
	}

	async SaveNewArrayCurrentLessons(arrayNewCurrentLessonDto: CurrentLessonDto[]) {
		const arrayOneGroupStudents = await userService.GetStudentsByGroupId({groupId: arrayNewCurrentLessonDto[0].group._id});

		for (const newCurrentLessonDto of arrayNewCurrentLessonDto) {
			const newCurrentLesson = new CurrentLesson({
				_id: newCurrentLessonDto._id,
				name: newCurrentLessonDto.name,
				teachers: newCurrentLessonDto.teachers,
				beginDate: newCurrentLessonDto.beginDate,
				endDate: newCurrentLessonDto.endDate,
				classRoom: newCurrentLessonDto.classRoom,
				group: newCurrentLessonDto.group,
			});

			await this.saveEveryStudent(arrayOneGroupStudents, newCurrentLessonDto, newCurrentLesson);
		}
	}

	private async saveEveryStudent(arrayOneGroupStudents: Array<HydratedDocument<IUser>>, newCurrentLessonDto: CurrentLessonDto, newCurrentLesson: ICurrentLesson) {
		for (const oneStudent of arrayOneGroupStudents) {
			const markOneStudent = await markRepository.GetAdditionalDataMarksOfOneStudent(oneStudent._id, newCurrentLessonDto.name._id);
            
			if(markOneStudent) {
				await this.putAndSaveNewStudentMark(markOneStudent, newCurrentLesson);
			} else {
				const newMark = new Mark({
					user: oneStudent._id,
					lesson: newCurrentLessonDto.name,
					allCurrentLessons: [{currentLesson: newCurrentLessonDto._id, mark: ""}]
				});

				await newMark.save();
			}
		}
	}
   

	private async putAndSaveNewStudentMark(markOneStudent: markOneStudent, newCurrentLesson: ICurrentLesson) {
		const arrayCurrentLessons = markOneStudent.allCurrentLessons;

		for (let i = arrayCurrentLessons.length - 1; i >= 0; i--) {
			if(arrayCurrentLessons[i].currentLesson.beginDate < new Date(newCurrentLesson.beginDate)) {
				markOneStudent.allCurrentLessons.splice(i + 1, 0, {currentLesson: newCurrentLesson, mark: ""}); 
                
				break;    
			} 

			if(i === 0) {
				markOneStudent.allCurrentLessons.unshift({currentLesson: newCurrentLesson, mark: ""}); 
			}
		}

		await markOneStudent.save();
	}
}

type markOneStudent = ReturnType<() => 
     HydratedDocument<IMark> & {
        allCurrentLessons: {
            currentLesson: ICurrentLesson,
            mark: string
        }[]
    }
>

export default new MarkService();