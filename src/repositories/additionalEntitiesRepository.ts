import { Model } from "mongoose"
import Role from "../models/Role"

export default class AdditionalEntitiesRepository {
    static GetDocRole(modelRole: Model<any>, valueRole: Array<string>) {
        return modelRole.aggregate([
            {
                $match: {
                    value: {
                        $in: valueRole
                    }
                }
            }
        ])
    }
    
    static GetDocFaculty(modelFaculty: Model<any>, valueFaculty: Array<string>) {
        return modelFaculty.aggregate([
            {
                $match: {
                    name: {
                        $in: valueFaculty
                    }
                }
            }
        ])
    }
    
    static GetDocGroup(modelGroup: Model<any>, valueGroup: Array<string>) {
        return modelGroup.aggregate([
            {
                $match: {
                    name: {
                        $in: valueGroup
                    }
                }
            }
        ])
    }
    
    static GetDocDepartment(modelDepartment: Model<any>, valueDepartment: Array<string>) {
        return modelDepartment.aggregate([
            {
                $match: {
                    name: {
                        $in: valueDepartment
                    }
                }
            }
        ])
    }
}