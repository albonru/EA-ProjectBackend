import mongoose, { Schema, Document } from 'mongoose';
import { IParking } from './Parking';
import { IUser } from './User';

const BookingSchema = new Schema({
	parking: { type: Schema.Types.ObjectId, ref: "Parking" },
	customer: { type: Schema.Types.ObjectId, ref: "User" },
	arrival: Date,
	departure: Date,
	cost: Number,
	owner: { type: Schema.Types.ObjectId, ref: "User" }
});

export interface IBooking extends Document {
	parking: IParking;
	customer: IUser;
	arrival: Date;
	departure: Date;
	cost: number;
	owner: IUser;
}

export default mongoose.model<IBooking>('Booking', BookingSchema);