class CreateManyUsersDto {
	name: string;
	email: string;
	roles: string[];
	departments: string[];
	faculties: string[];
	groups: string[];

	constructor( name: string, email: string, roles: string[], departments: string[], faculties: string[], groups: string[]) {
		this.name = name;
		this.email = email;
		this.roles = roles;
		this.departments = departments;
		this.faculties = faculties;
		this.groups = groups;
	}
}