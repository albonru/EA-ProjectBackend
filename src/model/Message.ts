import mongoose, { Schema, Document } from 'mongoose';
import { IChat } from './Chat';
import { IUser } from './User';

const MessageSchema = new Schema({
	chat: { type: Schema.Types.ObjectId, ref: "Chat" },
	client: { type: Schema.Types.ObjectId, ref: "User" },
	send: Date,
	text: { type: String, required: true }
});

export interface IMessage extends Document {
	chat: IChat;
	client: IUser;
	send: Date;
	text: string;
}

export default mongoose.model<IMessage>('Message', MessageSchema);