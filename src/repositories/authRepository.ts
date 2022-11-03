import User from "../models/User";

const { secret } = require("../config/config");

class AuthRepository {
	async Login(username: string, password: string) {
		const user = await User.findOne({ username: username })
			.populate("roles")
			.populate("faculties")
			.populate("departments")
			.populate("groups")
			.exec();

		return user;
	}
}

export default new AuthRepository();
