import mongoose, { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IRide extends Document {
	_id: String;
	name: String;
	code: String;
	seatsPerDay: Number;
	availableSeats: number;
	rideTimings: [{
		startTime: String;
		endTime: String;
	}],
	bookingTiming: {
		startTime: String,
		endTime: String
	}
}

const RideSchema: Schema = new Schema<IRide>({
	_id: { type: String, default: uuidv4 },
	name: { type: String, trim: true, required: true },
	code: { type: String, trim: true, required: true },
	seatsPerDay: { type: Number, required: true },
	availableSeats: { type: Number, required: true, min: [0, "No seats available."]},
	rideTimings: [{
		startTime: { type: String, trim: true },
		endTime: { type: String, trim: true }
	}],
	bookingTiming: {
		startTime: { type: String, trim: true },
		endTime: { type: String, trim: true }
	}
}, {
	timestamps: true
});


export const Ride = model<IRide>('Ride', RideSchema);
