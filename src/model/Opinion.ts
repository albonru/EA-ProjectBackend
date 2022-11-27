import { Schema, model } from 'mongoose';

const Opinion = new Schema({
    us_id: { type: String, required: true },
    park_id: { type: String, required: true },
	date: { type: Date, required: true },
    description:{type: String },
    puntuacio: Number
});
export default model('Opinion', Opinion);