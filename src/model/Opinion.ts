import { Schema, model } from 'mongoose';

const Opinion = new Schema({
    //id_Opinion: { type: Array, required: true },
    us_id: { type: String, required: true },
    park_id: { type: String, required: true },
	date: { type: Date, required: true },
    description:{type: String, required: true},
    puntuacio: Number,

});
export default model('Opinion', Opinion);
