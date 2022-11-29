import { Schema, model } from 'mongoose';

const User = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	points: Number,
    myBookings: [{ type: Schema.Types.ObjectId, ref: 'Booking'}],
    myOpinions: [{ type: Schema.Types.ObjectId, ref: 'Opinion'}],
    myFavorites: [{ type: Schema.Types.ObjectId, ref: 'Parking'}],
    myParkings: [{ type: Schema.Types.ObjectId, ref: 'Parking'}],
    deleted: { type: Boolean, required: true }
});

// interface IUser {
//     name: string;
//     password: string;
//     email: string;
//     points: number;
//     deleted: boolean;
// }

// const IUser = model<IUser>('User', User);
export default model('User', User);