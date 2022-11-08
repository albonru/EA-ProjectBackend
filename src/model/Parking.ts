import { Schema, model } from 'mongoose';

const Parking = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
    opinions: [{ type: Schema.Types.ObjectId, ref: "Opinion" }],
    email: String,
    country: String,
	city: String,
	street: String,
    streetNumber: Number,
	spotNumber: Number,
    type: String,
    price: Number,
    size: String,
    difficulty: Number,
    score: Number // S'actualitzen de manera interna
});

export default model('Parking', Parking);
