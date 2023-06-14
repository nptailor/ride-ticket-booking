import mongoose, { Schema} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IRide, Ride } from './Rides';
import { IUser, User } from './User';

export interface ITicket extends Document {
	_id: String
	rideId: IRide["_id"];
	userId: IUser["_id"];
	riderName: String;
	date: String,
	age: Number
  }

const TicketSchema: Schema = new Schema({
	_id: { type: String, default: uuidv4},
	rideId: {
		type: String,
		ref: Ride
	},
	userId: {
		type: String,
		ref: User
	},
	riderName: { type: String, trim: true, require: true },
	date: { type: String, require: true },
	age: { type: Number, require: true }
}, {
	timestamps: true
});

export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);
