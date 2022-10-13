import { Schema, model } from 'mongoose';

const Address = new Schema({
	country: String,
	city: String,
	street: String,
	spotNumber: Number,
});

export default model('Address', Address);