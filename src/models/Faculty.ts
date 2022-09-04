import { Schema, model } from "mongoose";
import { IFaculty } from "../types/modelsTypes";

const Faculty = new Schema<IFaculty>({
	name: {type: String, unique: true, required: true}
});

export default model<IFaculty>("Faculty", Faculty);