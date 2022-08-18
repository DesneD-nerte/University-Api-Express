import { Schema } from "mongoose";

export interface ICurrentLesson {
    name: Schema.Types.ObjectId,
    teachers: Schema.Types.ObjectId,
    beginDate: Date,
    endDate: Date,
    classroom: Schema.Types.ObjectId,
    group: Schema.Types.ObjectId
}

export interface IUser {
    username: string,
    password: string,
    roles: Array<Schema.Types.ObjectId>,
    name: string,
    email: string,
    imageUri: string,
    faculties: Array<Schema.Types.ObjectId>,
    departments: Array<Schema.Types.ObjectId>,
    groups: Array<Schema.Types.ObjectId>
}

export interface INews {
    name: string,
    content: string,
    createdAt: Date,
}

export interface IRole {
    value: string
}

export interface IAudience {
    name: string
}

export interface IDepartment {
    name: string,
    room: string
}

export interface IFaculty {
    name: string
}

export interface IGroup {
    name: string
}

export interface ILesson {
    name: string
}