import { Model } from "mongoose"
import { IRole, IFaculty, IGroup, IDepartment } from "../types/modelsTypes"

export default class AdditionalEntitiesRepository {
    static GetDocModel<T extends IRole | IGroup | IFaculty | IDepartment>(modelRole: Model<T>, value: Array<string>) {
        return modelRole.aggregate([
            {
                $match: {
                    $or: [
                        {name: {$in: value}},
                        {value: {$in: value}},
                    ]
                }
            }
        ])
    }
}