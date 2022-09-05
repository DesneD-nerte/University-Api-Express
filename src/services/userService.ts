import userRepository from "../repositories/userRepository";
import { IJwtPayloadData } from "../types/servicesTypes/jwtTypes";
import { UserIdDto } from "../dto/user/userIdDto";
import { UserGroupIdDto } from "../dto/user/UserGroupIdDto";
import { UserFilterDto } from "../dto/user/UserFilterDto";
import mongooseService from "./mongooseService";
import ApiError from "../exceptions/apiError";

class UserService {
	async GetMyData(user: IJwtPayloadData) {
		const myProfile = await userRepository.GetMyData(user._id);
        
		return myProfile;
	}

	async GetStudents(userFilterDto: UserFilterDto) {
		const limit = userFilterDto.limit || 10;
		const page = userFilterDto.page | 0;

		const arrayStudents = await userRepository.GetStudents(limit, page);

		return arrayStudents;
	}

	async GetStudentsByGroupId(userGroupDto: UserGroupIdDto) {
		const groupId = mongooseService.ToObjectId(userGroupDto.groupId);
		const arrayStudents = await userRepository.GetStudentsByGroupId(groupId);

		return arrayStudents;
	}
    
	async GetUserById(userIdDto: UserIdDto) {
		try {
			const _id = mongooseService.ToObjectId(userIdDto.id);
			const user = await userRepository.GetUserById(_id);

			return user;
		} catch(e) {
			if(e instanceof Error) {
				throw ApiError.BadRequest("Ошибка при поиске пользователя по Id", [e.message]);
			}
		}
	}

	async GetTeachers() {
		const arrayTeachers = await userRepository.GetTeachers();

		return arrayTeachers;
	}

	async GetAllButMe(userIdDto: UserIdDto) {
		const _id = mongooseService.ToObjectId(userIdDto.id);

		const arrayUsers = await userRepository.GetAllButMe(_id);

		return arrayUsers;
	}
}

export default new UserService();