import { Model } from "mongoose"

//Возвращает документ, значение которого равно данной роли
// function getDocRole(modelRole: Model<any>, valueRole: string) {
//     return modelRole.findOne({value: valueRole})
// }

function getDocRole(modelRole: Model<any>, valueRole: Array<string>) {
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


export = getDocRole;