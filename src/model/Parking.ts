import { Schema, model } from 'mongoose';
import { stringify } from 'querystring';

const Parking = new Schema({
	id: String,
	user: { //Aqui puc nose si puc posar userid
		type: Schema.Types.ObjectId,
		ref: "User"
	},
    address: {
        type: Schema.Types.ObjectId,
		ref: "Address"
    },
    opinions: {
        type: Schema.Types.ObjectId,
		ref: "Opinion"
    },
    type: String,
    price: Number,
    size: String,
    difficulty: Number, 
    score: Number,
});

export default model('Parking', Parking);