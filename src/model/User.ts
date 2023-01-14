import mongoose, { Schema, Document } from 'mongoose';
import { IBooking } from './Booking';
import { IOpinion } from './Opinion';
import { IParking } from './Parking';
import { IReport } from './Report';

const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	points: Number,
    myBookings: [{ type: Schema.Types.ObjectId, ref: 'Booking'}],
    myOpinions: [{ type: Schema.Types.ObjectId, ref: 'Opinion'}],
    myFavorites: [{ type: Schema.Types.ObjectId, ref: 'Parking'}],
    myParkings: [{ type: Schema.Types.ObjectId, ref: 'Parking'}],
    myReports: [{ type: Schema.Types.ObjectId, ref: 'Report'}],
    deleted: { type: Boolean, required: true }
});

export interface IUser extends Document{
    name: string;
    password: string;
    email: string;
    points: number;
    deleted: boolean;
    myBookings: IBooking[];
    myOpinions: IOpinion[];
    myFavourites: IParking[];
    myParkings: IParking[];
    myReports: IReport[];
}

export default mongoose.model<IUser>('User', UserSchema);
