import { RequestHandler } from 'express';
import { Ride } from '../Models/Rides';

// create a new ride
export const addRide: RequestHandler = async (req, res, next) => {
	console.log({body: req.body})
	const newRide = await new Ride(req.body).save();
	res.status(200).json({code: "success", body: newRide})
};

// find a ride
export const getRideDetails: RequestHandler = async (req, res, next) => {
	const id = req.query.id;
	const ride = await Ride.findById({_id:id});
	res.status(200).json({code: "success", ride: ride})
};