import { HydratedDocument } from "mongoose";
import { IDepartment, IFaculty, IGroup, IRole } from "../modelsTypes";

export interface IGeneratedProperties {
	generatedUsername: string;
	generatedPassword: string;
	hashPassword: string;

	userRolesDocs: Array<HydratedDocument<IRole>>;
	userFacultiesDocs: Array<HydratedDocument<IFaculty>>;
	userGroupsDocs: Array<HydratedDocument<IGroup>>;
	userDepartmentsDocs: Array<HydratedDocument<IDepartment>>;
}
