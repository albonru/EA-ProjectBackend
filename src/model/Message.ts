import { Schema, model } from 'mongoose';

const Message = new Schema({
	// id: { type: Number, requied: true},
	chat: { type: Schema.Types.ObjectId, ref: "Chat" },
	client: { type: Schema.Types.ObjectId, ref: "User" },
	Send: Date,
	text: { type: String, required: true },
});

export default model('Message', Message);