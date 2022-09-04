import { Schema, model } from "mongoose";
import { IAudience } from "../types/modelsTypes";

const Audience = new Schema<IAudience>({
	name: {type: String, unique: true, required: true}
});

export default model<IAudience>("Audience", Audience);