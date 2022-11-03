import { Schema, model } from "mongoose";
import { ILesson } from "../types/modelsTypes";

const Lesson = new Schema<ILesson>({
	name: { type: String, unique: true, required: true },
});

export default model<ILesson>("Lesson", Lesson);
