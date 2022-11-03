import { Schema, model } from "mongoose";
import { ICurrentLesson } from "../types/modelsTypes";

const CurrentLesson = new Schema<ICurrentLesson>(
	{
		name: { type: Schema.Types.ObjectId, required: true, ref: "Lesson" },
		teachers: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
		beginDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		classroom: { type: Schema.Types.ObjectId, required: true, ref: "Audience" },
		group: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
	},
	{
		collection: "currentLessons",
	}
);

export default model<ICurrentLesson>("CurrentLesson", CurrentLesson);
