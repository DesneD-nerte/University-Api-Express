import { Schema, model } from 'mongoose';
import { IDepartment } from '../types/modelsTypes';

const Department = new Schema<IDepartment>({
    name: {type: String, unique: true, required: true},
    room: {type: String}
});

export default model<IDepartment>('Department', Department);