import { HydratedDocument } from "mongoose";
import { ICurrentLesson } from "../types/modelsTypes";

export default function sortCurrentLessonsByDate(currentLessons: HydratedDocument<ICurrentLesson[]>) {
    
    currentLessons.sort((a, b) => {
        const dateA = a.beginDate;
        const dateB = b.beginDate;
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        
        return 0;
    })
}