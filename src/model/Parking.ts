import { Schema, model } from 'mongoose';
import { stringify } from 'querystring';

const Parking = new Schema({
	id: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
    opinions: {
        type: Schema.Types.ObjectId,
		ref: "Opinion"
    },
    country: String,
	city: String,
	street: String,
	spotNumber: Number,

    type: String,
    price: Number,
    size: String,
    difficulty: Number,
    score: Number // S'actualitzen de manera interna
});

export default model('Parking', Parking);