import { UserFilterDto } from "../dto/user/userFilterDto";
import { UserGroupIdDto } from "../dto/user/userGroupIdDto";
import userRepository from "../repositories/userRepository";
import { IJwtPayloadData } from "../types/servicesTypes/jwtTypes";
import { UserIdDto } from "../dto/user/userIdDto";

class UserService {
    async GetMyData(user: IJwtPayloadData) {
        const myProfile = await userRepository.GetMyData(user._id);
        
        return myProfile
    }

    async GetStudents(userFilterDto: UserFilterDto) {
        const limit = userFilterDto.limit || 10;
        const page = userFilterDto.page | 0;

        const arrayStudents = await userRepository.GetStudents(limit, page);

        return arrayStudents;
    }

    async GetStudentsByGroupId(userGroupDto: UserGroupIdDto) {
        const groupId = userGroupDto.groupId;
        const arrayStudents = await userRepository.GetStudentsByGroupId(groupId);

        return arrayStudents;
    }
    
    async GetUserById(userIdDto: UserIdDto) {
        const user = await userRepository.GetUserById(userIdDto._id);

        return user;
    }

    async GetTeachers() {
        const arrayTeachers = await userRepository.GetTeachers();

        return arrayTeachers;
    }

    async GetAllButMe(userIdDto: UserIdDto) {
        const _id = userIdDto._id;
        const arrayUsers = await userRepository.GetAllButMe(_id);

        return arrayUsers;
    }
}

export default new UserService();