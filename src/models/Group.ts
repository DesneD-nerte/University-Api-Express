import { Schema, model } from 'mongoose';
import { IGroup } from '../types/modelsTypes';

const Group = new Schema<IGroup>({
    name: {type: String, unique: true, required: true}
});

export default model<IGroup>('Group', Group);