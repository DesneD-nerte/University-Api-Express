import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { IJwtPayload } from "../types/servicesTypes/jwtTypes";
import { UserGroupIdDto } from "../dto/user/userGroupIdDto";
import { UserFilterDto } from "../dto/user/userFilterDto";
import { UserIdDto } from "../dto/user/userIdDto";

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
    
    async GetUserById(req: Request<any, any, any, UserIdDto>, res: Response, next: NextFunction) {
        try {
            const userIdDto = req.query;
            const student = await userService.GetUserById(userIdDto);

            return res.json(student);
        } catch (err) {
            next(err);
        }
    }

    async GetTeachers(req: Request, res: Response, next: NextFunction) {
        try {
            const arrayTeachers = await userService.GetTeachers();

            return res.json(arrayTeachers);
        } catch (err) {
            next(err);
        }
    }

    async GetAllButMe(req: Request<any, any, any, UserIdDto>, res: Response, next: NextFunction) {
        try {
            const userIdDto = req.query;
            const arrayUsers = await userService.GetAllButMe(userIdDto);

            res.json(arrayUsers);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();