import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

const ReportSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
    type: String,
    time: String,
    text: String,
    level: Number
});
export interface IReport extends Document{
    user: IUser;
    type: string;
    time: string;
    text: string;
    level: number;
}
export default mongoose.model<IReport>('Report', ReportSchema);