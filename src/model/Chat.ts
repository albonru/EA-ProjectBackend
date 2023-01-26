import mongoose, { Schema, Document } from 'mongoose';
import { IMessage } from './Message';
import { IParking } from './Parking';
import { IUser } from './User';
import {WebSocket} from "ws";

const ChatSchema = new Schema({
	parking: { type: Schema.Types.ObjectId, ref: "Parking" },
    client1: { type: Schema.Types.ObjectId, ref: "User" },
	wsclient1: [{type: String}],
	client2: { type: Schema.Types.ObjectId, ref: "User" },
	wsclient2: [{type: String}],
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
});

export interface IChat extends Document {
	parking: IParking;
	client1: IUser;
	wsclient1: string[];
	client2: IUser;
	wsclient2: string[];
	messages: IMessage[];
}

export default mongoose.model<IChat>('Chat', ChatSchema);