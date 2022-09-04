class CreateUserDto {
	username: string;
	password: string;
	name: string;
	email: string;
	roles: string[];

	constructor(username: string, password: string, name: string, email: string, roles: string[]) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.roles = roles;
	}
}