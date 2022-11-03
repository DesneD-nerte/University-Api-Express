import { Schema, model } from "mongoose";
import { INews } from "../types/modelsTypes";

const News = new Schema<INews>({
	name: { type: String, required: true },
	content: { type: String, required: true },
	createdAt: { type: Date, required: true },
});

export default model<INews>("News", News);
