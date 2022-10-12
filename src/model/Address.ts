import { Schema, model } from 'mongoose';

const Address = new Schema({
	//tipus de via ?
	//numero portal?
	country: String,
	city: String,
	street: String,
	spotNumber: Number,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
});

export default model('Address', Address);