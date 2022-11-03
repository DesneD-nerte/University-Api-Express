import { Schema, model } from "mongoose";
import { IAllCurrentLessonsMark, IMark } from "../types/modelsTypes";

const allCurrentLessonsSchema = new Schema<IAllCurrentLessonsMark>({
	currentLesson: { type: Schema.Types.ObjectId, required: true, ref: "CurrentLesson" },
	mark: { type: String },
});

const Mark = new Schema<IMark>({
	allCurrentLessons: [{ type: allCurrentLessonsSchema }],
	lesson: { type: Schema.Types.ObjectId, required: true, ref: "Lesson" },
	user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export default model<IMark>("Mark", Mark);
