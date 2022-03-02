import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import Lesson from "../models/Lesson";
import UserRepository from "../repositories/userRepository";
import fs from 'fs';
import path from "path";

class UserController {
    async getMyData (req: Request, res: Response, next: NextFunction) {//Здесь мы получаем наш токен
        console.log(req.body.user);

        const usernameFromToken = req.body.user.username;
        
        const myProfileMongo = await User.findOne({username: usernameFromToken});
        
        const {id, username, name, roles} = myProfileMongo;

        // let uriImagePath;
        // const files = fs.readdirSync('./images/usersAvatar');
        // files.forEach(oneFile => {
        //     if(oneFile === `${id}.jpeg`) {
        //         uriImagePath = path.join(__dirname, '/../images/usersAvatar/', oneFile);
        //     }
        // });

        return res.json({id, username, name, roles});
    }

    async getStudents(req: Request, res: Response, next: NextFunction) {//Получаю просто всех студентов (нет в header - максимального количества студентов)
        console.log("getStudents method.");

        const limit = Number.parseInt(req.query.limit?.toString()!) || 10; 
        const page = Number.parseInt(req.query.page?.toString()!) || 0; 

        const massiveStudents = await User.find({roles: ["STUDENT"]}, "name email")
        .limit(limit)
        .skip(limit * page);//Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу

        return res.json(massiveStudents);
    }

    async getStudentsWithSkippedLessons(req: Request, res: Response, next: NextFunction) {
        console.log("getStudentsWithSkippedLessons method.");

        const limit = Number.parseInt(req.query.limit?.toString()!) || 10; 
        const page = Number.parseInt(req.query.page?.toString()!) || 0; 

        const studentsWithCountedLessons = await UserRepository.getMissedLessons(limit, page);

        const countStudents = await UserRepository.getCountStudents();

        res.setHeader('maxStudents', countStudents[0].count);//Так как всегда возвращается массив нужно поставить нулевой индекс

        return res.json(studentsWithCountedLessons);
    }

    async getStudentById(req: Request, res: Response, next: NextFunction) {
        console.log("getStudentById method.");

        const student = await User.findOne({_id: req.params.id});

        return res.json(student);
    }
}

export default new UserController();