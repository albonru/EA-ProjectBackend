import { Schema, model } from 'mongoose';

const Report = new Schema({
    reportingUser: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    type: { type: String },
    closed: { type: Boolean }
});

export default model('Report', Report);