import mongoose, { Schema, Document } from 'mongoose';
import { IMessage } from './Message';
import { IParking } from './Parking';
import { IUser } from './User';

const ChatSchema = new Schema({
	parking: { type: Schema.Types.ObjectId, ref: "Parking" },
    client: { type: Schema.Types.ObjectId, ref: "User" },
	customer: { type: Schema.Types.ObjectId, ref: "User" },
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
});

export interface IChat extends Document {
	parking: IParking;
	client: IUser;
	customer: IUser;
	messages: IMessage[];
}

export default mongoose.model<IChat>('Chat', ChatSchema);