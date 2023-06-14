import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export interface IUser extends Document {
	_id: string;
	name: string;
	username: string;
	password: string;
}

const UserSchema = new Schema({
	_id: { type: String, default: uuidv4 },
	name: { type: String, trim: true, require: true },
	username: { type: String, trim:true, require: true },
	password: { type: String, require: true },
}, {
	timestamps: true
});

export const User = mongoose.model<IUser>('User', UserSchema);
