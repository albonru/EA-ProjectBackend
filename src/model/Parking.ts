import { Schema, model } from 'mongoose';

const Parking = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
    opinions: [{ type: Schema.Types.ObjectId, ref: "Opinion" }],
    country: String,
	city: String,
	street: String,
    streetNumber: Number,
	spotNumber: Number,
    type: String,
    price: Number,
    size: String,
    difficulty: Number,
    score: Number
});

export default model('Parking', Parking);
