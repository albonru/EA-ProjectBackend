import mongoose, { Schema, Document } from 'mongoose';
import { IOpinion} from './Opinion';
import { IUser } from './User';

const ParkingSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
    opinions: [{ type: Schema.Types.ObjectId, ref: "Opinion" }],
    country: String,
	city: String,
	street: String,
    streetNumber: Number,
	spotNumber: Number,
    type: String,
    price: Number,
    size: String,
    difficulty: Number,
    score: Number,
    longitude: Number,
    latitude: Number,
    range: String,
});

export interface IParking extends Document{
    user: IUser;
    opinions: IOpinion[];
    country: string;
	city: string;
	street: string;
    streetNumber: number;
	spotNumber: number;
    type: string;
    price: number;
    size: string;
    difficulty: number;
    score: number;
    latitude: number;
    longitude: number;
    range: string;
}

export default mongoose.model<IParking>('Parking', ParkingSchema);
// export default mongoose.model('Parking', ParkingSchema);
