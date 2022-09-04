import ApiError from "../exceptions/apiError";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const {secret} = require ("../config/config");

class AuthRepository {

	async Login(username: string, password: string) {
		const user = await User.findOne({username: username})
			.populate("roles")
			.populate("faculties")
			.populate("departments")
			.populate("groups")
			.exec(); 
        
		return user;
	}
}

export default new AuthRepository();
