import ApiError from "../exceptions/apiError";
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const {secret} = require ("../config/config");

export default class AuthRepository {

    static async login(username: string, password: string) {
        const user = await User.findOne({username: username}); 
        
        return user;
    }
}
