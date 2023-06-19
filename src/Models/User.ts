import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export interface IUser extends Document {
	_id: string;
	name: string;
	username: string;
	password: string;
}

const UserSchema = new Schema<IUser>({
	_id: { type: String, default: uuidv4 },
	name: { type: String, trim: true, required: true },
	username: { type: String, trim:true, required: true },
	password: { type: String, required: true },
}, {
	timestamps: true
});

export const User = model<IUser>('User', UserSchema);
