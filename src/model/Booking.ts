import { Schema, model } from 'mongoose';

const Booking = new Schema({
	parking: { type: Schema.Types.ObjectId, ref: "Parking" },
	customer: { type: Schema.Types.ObjectId, ref: "User" },
	arrival: Date,
	departure: Date,
	cost: Number
});

export default model('Booking', Booking);