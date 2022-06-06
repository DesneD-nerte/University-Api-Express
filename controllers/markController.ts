import { Request, Response, NextFunction } from "express";
import Mark from "../models/Mark";
import User from "../models/User";
import MarkRepository from "../repositories/markRepository";

class MarkController {
    async GetMarks (req: Request, res: Response, next: NextFunction) {
        try {
            const marks = await MarkRepository.getMarks();
            console.log(marks);

            return res.json(marks);

        } catch(e) {
            console.log(e);

            return res.send(e);
        }
    }

    async SaveNewCurrentLesson (req: Request, res: Response, next: NextFunction) {
        const {appointmentData, newCurrentLesson} = req.body;

        const arrayOneGroupStudents = await User.find({groups: [appointmentData.groupId]});
        
        for (const oneStudent of arrayOneGroupStudents) {
            const markOneStudent = await MarkRepository.getAdditionalDataMarksOfOneStudent(oneStudent._id, appointmentData.lessonNameId);
            if(markOneStudent) {
                const currentLessons = markOneStudent.allCurrentLessons;
                for (let i = currentLessons.length - 1; i >= 0; i--) {
                    if(currentLessons[i].currentLesson.beginDate < new Date(newCurrentLesson.beginDate)) {
                        markOneStudent.allCurrentLessons.splice(i + 1, 0, {currentLesson: newCurrentLesson._id, mark: ''}); 
                        
                        break;    
                    } 

                    if(i === 0) {
                        markOneStudent.allCurrentLessons.unshift({currentLesson: newCurrentLesson._id, mark: ''}); 
                    }
                }

                await markOneStudent.save();
            } else {
                const newMark = new Mark({
                    user: oneStudent._id,
                    lesson: appointmentData.lessonNameId,
                    allCurrentLessons: [{currentLesson: newCurrentLesson._id, mark: ''}]
                })

                await newMark.save();
            }
        }

        return res.sendStatus(200);
    }

    async SaveNewArrayCurrentLessons(req: Request, res: Response, next: NextFunction) {
        const {appointmentData, newCurrentLessonsArray} = req.body;

        const arrayOneGroupStudents = await User.find({groups: [appointmentData.groupId]});

        for (const newCurrentLesson of newCurrentLessonsArray) {
            for (const oneStudent of arrayOneGroupStudents) {
                const markOneStudent = await MarkRepository.getAdditionalDataMarksOfOneStudent(oneStudent._id, appointmentData.lessonNameId);
                
                if(markOneStudent) {
                    const currentLessons = markOneStudent.allCurrentLessons;
                    for (let i = currentLessons.length - 1; i >= 0; i--) {
                        if(currentLessons[i].currentLesson.beginDate < new Date(newCurrentLesson.beginDate)) {
                            markOneStudent.allCurrentLessons.splice(i + 1, 0, {currentLesson: newCurrentLesson._id, mark: ''}); 
                            
                            break;    
                        } 

                        if(i === 0) {
                            markOneStudent.allCurrentLessons.unshift({currentLesson: newCurrentLesson._id, mark: ''}); 
                        }
                    }

                    await markOneStudent.save();
                } else {
                    const newMark = new Mark({
                        user: oneStudent._id,
                        lesson: appointmentData.lessonNameId,
                        allCurrentLessons: [{currentLesson: newCurrentLesson._id, mark: ''}]
                    })

                    await newMark.save();
                }
            }
        }

        return res.sendStatus(200);
    }

    async UpdateCurrentLesson(req: Request, res: Response, next: NextFunction) {
        const existedMark = req.body;
        console.log(existedMark);
        await Mark.findOneAndUpdate({_id: existedMark._id}, {allCurrentLessons: existedMark.allCurrentLessons});

        return res.sendStatus(200);
    }
}

export default new MarkController();