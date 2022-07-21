import { Schema } from "mongoose";

export type Message = {
    _id?: Schema.Types.ObjectId,/////?
    content: String,
    createdAt: Date,
    user: Schema.Types.ObjectId,
    isVisible: Boolean/////////////////!!!!!!
}
