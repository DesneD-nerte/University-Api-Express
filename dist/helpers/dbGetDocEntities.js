"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocDepartment = exports.getDocGroup = exports.getDocFaculty = exports.getDocRole = void 0;
//Возвращает документ, значение которого равно данной роли
// function getDocRole(modelRole: Model<any>, valueRole: string) {
//     return modelRole.findOne({value: valueRole})
// }
function getDocRole(modelRole, valueRole) {
    return modelRole.aggregate([
        {
            $match: {
                value: {
                    $in: valueRole
                }
            }
        }
    ]);
}
exports.getDocRole = getDocRole;
function getDocFaculty(modelFaculty, valueFaculty) {
    return modelFaculty.aggregate([
        {
            $match: {
                name: {
                    $in: valueFaculty
                }
            }
        }
    ]);
}
exports.getDocFaculty = getDocFaculty;
function getDocGroup(modelGroup, valueGroup) {
    return modelGroup.aggregate([
        {
            $match: {
                name: {
                    $in: valueGroup
                }
            }
        }
    ]);
}
exports.getDocGroup = getDocGroup;
function getDocDepartment(modelDepartment, valueDepartment) {
    return modelDepartment.aggregate([
        {
            $match: {
                name: {
                    $in: valueDepartment
                }
            }
        }
    ]);
}
exports.getDocDepartment = getDocDepartment;
// export = getDocRole;
