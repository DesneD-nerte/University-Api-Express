import mongoose from "mongoose";

export interface IJwtPayload {
	user: {
		_id: mongoose.Types.ObjectId;
		username: string;
		roles: mongoose.Types.ObjectId[];
	};
}

export interface IJwtPayloadData {
	_id: mongoose.Types.ObjectId;
	username: string;
	roles: mongoose.Types.ObjectId[];
}
