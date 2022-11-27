import { Schema, model } from 'mongoose';

const Chat = new Schema({
	parking: { type: Schema.Types.ObjectId, ref: "Parking" },
    client: { type: Schema.Types.ObjectId, ref: "User" },
	customer: { type: Schema.Types.ObjectId, ref: "User" },
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
});

export default model('Chat', Chat);