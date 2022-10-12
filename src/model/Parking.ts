import { Schema, model } from 'mongoose';
import { stringify } from 'querystring';

const Parking = new Schema({
	id: String,
	user: { //Aqui puc nose si puc posar userid
		type: Schema.Types.ObjectId,
		ref: "User"
	},
    type: String,
    price: Number,
    size: String,
    difficulty: Number, 
    score: Number,
    direction: String
    //Faltaria la disponibilitat i les opinions
});

export default model('Parking', Parking);