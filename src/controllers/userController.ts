import { Request, Response, NextFunction } from "express";
import User from '../models/User';
import UserRepository from "../repositories/userRepository";
import { roleTeacherObjectId } from '../databaseLinks';

class UserController {
    async GetMyData (req: Request, res: Response) {//Здесь мы получаем наш токен

        const usernameFromToken = req.body.user.username;
        
        const myProfileMongo = await UserRepository.getMyData(usernameFromToken);
        
        const {_id, username, name, roles, imageUri, faculties, departments, groups} = myProfileMongo;

        return res.json({_id, username, name, roles, imageUri, faculties, departments, groups});
    }

    async GetStudents(req: Request, res: Response) {
        console.log("getStudents method.");

        const limit = Number.parseInt(req.query.limit?.toString()!) || 10; 
        const page = Number.parseInt(req.query.page?.toString()!) || 0; 

        const massiveStudents = await User.find({roles: ["STUDENT"]}, "name email")
        .limit(limit)
        .skip(limit * page);//Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу

        return res.json(massiveStudents);
    }

    async GetStudentsByGroupId(req: Request, res: Response) {

        const {groupId} = req.params;

        const arrayStudents = await User.find({groups: [groupId]})

        return res.json(arrayStudents);
    }
    
    async GetStudentById(req: Request, res: Response) {
        const student = await User.findOne({_id: req.params.id});

        return res.json(student);
    }

    async GetTeachers(req: Request, res: Response) {
        let massiveTeachers = await User.find({roles: {_id: roleTeacherObjectId}}, "_id name email imageUri roles")
            .populate({
                path: 'roles',
                // match: {value: 'TEACHER'}
            })
            .exec()

        return res.json(massiveTeachers);
    }

    async GetAll(req: Request, res: Response) {
        const users = await User.find({_id: {$nin: [req.query._id]}});

        res.json(users);
    }
}

export default new UserController();