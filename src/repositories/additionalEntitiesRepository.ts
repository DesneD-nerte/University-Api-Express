import { Model } from "mongoose";
import { IRole, IFaculty, IGroup, IDepartment } from "../types/modelsTypes";

class AdditionalEntitiesRepository {
	GetDocModel<T extends IRole | IGroup | IFaculty | IDepartment>(modelRole: Model<T>, value: Array<string>) {
		return modelRole.aggregate([
			{
				$match: {
					$or: [
						{name: {$in: value}},
						{value: {$in: value}},
					]
				}
			}
		]);
	}
}

export default new AdditionalEntitiesRepository();