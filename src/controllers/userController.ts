import { Request, Response, NextFunction } from "express";
import User from '../models/User';
import { roleTeacherObjectId } from '../databaseLinks';
import userService from "../services/userService";
import { IJwtPayload } from "../types/servicesTypes/jwtTypes";
import { UserGroupIdDto } from "../dto/user/UserGroupIdDto";
import { UserFilterDto } from "../dto/user/UserFilterDto";

class UserController {
    async GetMyData (req: Request<any, any, IJwtPayload, any>, res: Response, next: NextFunction) {
        try {
            const dataTokenUser = req.body.user;
            const myData = await userService.GetMyData(dataTokenUser);

            return res.json(myData);
        } catch (err) {
            next(err);
        }
    }

    async GetStudents(req: Request<any, any, any, UserFilterDto>, res: Response, next: NextFunction) {
        try {
            const userFilterDto = req.query;
            const arrayStudents = await userService.GetStudents(userFilterDto);

            return res.json(arrayStudents);
        } catch (err) {
            next(err);
        }
    }

    async GetStudentsByGroupId(req: Request<UserGroupIdDto, any, any, any>, res: Response, next: NextFunction) {
        try {
            const userGroupIdDto = req.params;
            const arrayStudents = await userService.GetStudentsByGroupId(userGroupIdDto);

            return res.json(arrayStudents);
        } catch (err) {
            next(err);
        }
    }
    
    async GetStudentById(req: Request<any, any, any, any>, res: Response, next: NextFunction) {
        try {
            const student = await User.findOne({_id: req.params.id});

            return res.json(student);
        } catch (err) {
            next(err);
        }
    }

    async GetTeachers(req: Request<any, any, any, any>, res: Response, next: NextFunction) {
        try {
        let massiveTeachers = await User.find({roles: {_id: roleTeacherObjectId}}, "_id name email imageUri roles")
            .populate({
                path: 'roles',
                // match: {value: 'TEACHER'}
            })
            .exec()

            return res.json(massiveTeachers);
        } catch (err) {
            next(err);
        }
    }

    async GetAllButMe(req: Request<any, any, any, any>, res: Response, next: NextFunction) {
        try {
            const users = await User.find({_id: {$nin: [req.query._id]}});

            res.json(users);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();