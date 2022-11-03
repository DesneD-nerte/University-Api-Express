import { Schema, model } from "mongoose";
import { IUser } from "../types/modelsTypes";

const User = new Schema<IUser>({
	username: { type: String, unique: true, required: true },
	password: { type: String, unique: true, required: true },
	roles: [{ type: Schema.Types.ObjectId, required: true, ref: "Role" }],
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	imageUri: { type: String },
	faculties: [{ type: Schema.Types.ObjectId, ref: "Faculty" }],
	departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
	groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
});

export default model<IUser>("User", User);
