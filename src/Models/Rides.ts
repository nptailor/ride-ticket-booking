import mongoose,{ Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IRide extends Document {
	_id: String;
	name: String;
	code: String;
	seatsPerDay: Number;
	rideTimings: [{
		startTime: String;
		endTime: String;
	}],
	bookingtiming: {
		startTime: String,
		endTime: String
	}
  }
  
const RideSchema: Schema = new Schema({
	_id: { type: String, default: uuidv4},
	name: { type: String, trim: true, require: true },
	code: { type: String, trim: true, require: true },
	seatsPerDay: { type: Number, trim: true, require: true },
	rideTimings: [{
		startTime: { type: String, trim: true },
		endTime: { type: String, trim: true }
	}],
	bookingTiming: {
		startTime: { type: String, trim: true },
		endTime: { type: String, trim: true }
	}
},{
    timestamps: true
});

export const Ride = mongoose.model<IRide>('Ride', RideSchema);
