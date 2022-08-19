import { UserFilterDto } from "../dto/user/UserFilterDto";
import { UserGroupIdDto } from "../dto/user/UserGroupIdDto";
import User from "../models/User";
import UserRepository from "../repositories/userRepository";
import { IJwtPayloadData } from "../types/servicesTypes/jwtTypes";
import { roleTeacherObjectId } from '../databaseLinks';
import { roleStudentObjectId } from '../databaseLinks';

class UserService {
    async GetMyData(user: IJwtPayloadData) {
        const myProfile = await UserRepository.getMyData(user._id);
        
        return myProfile
    }

    async GetStudents(userFilterDto: UserFilterDto) {
        const limit = userFilterDto.limit || 10;
        const page = userFilterDto.page | 0;

        const arrayStudents = await User.find({roles: [roleStudentObjectId]}, "name email")
            .limit(limit)
            .skip(limit * page);

        return arrayStudents;
    }

    async GetStudentsByGroupId(userGroupDto: UserGroupIdDto) {
        const arrayStudents = await User.find({groups: [userGroupDto.groupId]})

        return arrayStudents;
    }
    
    // async GetStudentById(req: Request, res: Response, next: NextFunction) {
    //     const student = await User.findOne({_id: req.params.id});

    //     return res.json(student);
    // }

    // async GetTeachers(req: Request, res: Response, next: NextFunction) {
    //     let massiveTeachers = await User.find({roles: {_id: roleTeacherObjectId}}, "_id name email imageUri roles")
    //         .populate({
    //             path: 'roles',
    //             // match: {value: 'TEACHER'}
    //         })
    //         .exec()

    //     return res.json(massiveTeachers);
    // }

    // async GetAll(req: Request, res: Response, next: NextFunction) {
    //     const users = await User.find({_id: {$nin: [req.query._id]}});

    //     res.json(users);
    // }
}

export default new UserService();