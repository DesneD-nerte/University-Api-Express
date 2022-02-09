import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

class UserController {
    async getMyData (req: Request, res: Response, next: NextFunction) {//Здесь мы получаем наш токен
        console.log(req.body.user);

        const usernameFromToken = req.body.user.username;
        
        const myProfileMongo = await User.findOne({username: usernameFromToken});
        
        const {username, name, roles} = myProfileMongo;

        return res.json({username, name, roles});
    }

    async getStudents(req: Request, res: Response, next: NextFunction) {
        console.log("getStudents method.");

        const limit = Number.parseInt(req.query.limit?.toString()!) || 10; 
        const page = Number.parseInt(req.query.page?.toString()!) || 0; 

        const massiveStudents = await User.find({roles: ["STUDENT"]}, "name email")
        .limit(limit)
        .skip(limit * page);//Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу

        return res.json(massiveStudents);
    }

    async getStudentById(req: Request, res: Response, next: NextFunction) {
        console.log("getStudentById method.");

        const student = await User.findOne({_id: req.params.id});

        return res.json(student);
    }
}

export default new UserController();