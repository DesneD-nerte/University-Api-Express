import { Model } from "mongoose"

export function getDocRole(modelRole: Model<any>, valueRole: Array<string>) {
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

export function getDocFaculty(modelFaculty: Model<any>, valueFaculty: Array<string>) {
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

export function getDocGroup(modelGroup: Model<any>, valueGroup: Array<string>) {
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

export function getDocDepartment(modelDepartment: Model<any>, valueDepartment: Array<string>) {
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