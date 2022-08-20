import { ObjectId } from "mongoose";

export class UserIdDto {
    _id: ObjectId

    constructor(_id: ObjectId) {
        this._id = _id;
    }
}