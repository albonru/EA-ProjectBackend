import mongoose, { Schema, Document } from 'mongoose';
import { IParking } from './Parking';
import { IUser } from './User';

const OpinionSchema = new Schema({
    user: { type: String, required: true, ref: 'User' },
    parking: { type: String, required: true },
	date: { type: Date, required: true },
    description: { type: String },
    score: Number
});

export interface IOpinion extends Document {
    user: IUser;
    parking: IParking;
    date: Date;
    description: string;
    score: number;
}

export default mongoose.model<IOpinion>('Opinion', OpinionSchema);