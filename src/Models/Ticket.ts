import { Schema, model } from 'mongoose';
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

const TicketSchema: Schema = new Schema<ITicket>({
	_id: { type: String, default: uuidv4},
	rideId: {
		type: String,
		ref: Ride,
		required: true
	},
	userId: {
		type: String,
		ref: User,
		required: true
	},
	riderName: { type: String, trim: true, required: true },
	date: { type: String, required: true },
	age: { type: Number, required: true }
}, {
	timestamps: true
});

TicketSchema.pre("save", async function (this: ITicket) {
	const ride = await Ride.findById({ _id: this.rideId });
	const user = await User.findById({ _id: this.userId });
	if (ride && user) {
		console.log("Ticket created")
		await Promise.resolve();
	}else{
		throw new Error('Either ride or user not present');
	}
});

export const Ticket = model<ITicket>('Ticket', TicketSchema);
