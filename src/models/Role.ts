import { Schema, model } from "mongoose";
import { IRole } from "../types/modelsTypes";

const Role = new Schema<IRole>({
	value: {type: String, unique: true}
});

export default model<IRole>("Role", Role);