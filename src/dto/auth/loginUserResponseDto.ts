import { IDepartment, IFaculty, IGroup, IRole } from "../../types/modelsTypes";

export class LoginUserResponseDto {
    token: string;
    _id: string;
    username: string;
    roles: IRole[]
    email: string;
    name: string;
    faculties: IFaculty[];
    groups: IGroup[];
    departments: IDepartment[];
    imageUri: string;

    constructor(token: string, _id: string, username: string,roles: any, email: string, name: string,
                faculties: any, groups: any, departments: any, imageUri: string) {
        this.token = token;
        this._id = _id;
        this.username = username;
        this.roles = roles;
        this.email = email;
        this.name = name;
        this.faculties = faculties;
        this.groups = groups;
        this.departments = departments;
        this.imageUri = imageUri;

    }
}