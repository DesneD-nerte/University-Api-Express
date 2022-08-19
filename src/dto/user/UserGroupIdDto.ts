import { ObjectId } from "mongoose";

export class UserGroupIdDto {
    groupId: ObjectId;

    constructor(groupId: ObjectId) {
        this.groupId = groupId;
    }
}