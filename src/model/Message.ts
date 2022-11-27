import { Schema, model } from 'mongoose';

const Message = new Schema({
	chat: { type: Schema.Types.ObjectId, ref: "Chat" },
	client: { type: Schema.Types.ObjectId, ref: "User" },
	send: Date,
	text: { type: String, required: true }
});

export default model('Message', Message);