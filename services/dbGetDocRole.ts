import { Model } from "mongoose"

//Возвращает документ, значение которого равно данной роли
function getDocRole(modelRole: Model<any>, valueRole: string) {
    return modelRole.findOne({value: valueRole})
}

export = getDocRole;