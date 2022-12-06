import mongoose, { Schema, Document } from 'mongoose';
import { IParking } from './Parking';
import { IUser } from './User';

const BookingSchema = new Schema({
	parking: { type: Schema.Types.ObjectId, ref: "Parking" },
	customer: { type: Schema.Types.ObjectId, ref: "User" },
	arrival: Date,
	departure: Date,
	cost: Number
});

export interface IBooking extends Document {
	parking: IParking;
	customer: IUser;
	arrival: Date;
	departure: Date;
	cost: number;
}

export default mongoose.model<IBooking>('Booking', BookingSchema);