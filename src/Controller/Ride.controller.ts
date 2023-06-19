import { RequestHandler } from 'express';
import { Ride } from '../Models/Rides';

// create a new ride
export const addRide: RequestHandler = async (req, res, next) => {
	console.log({body: req.body})
	new Ride(req.body).save().then((newRide)=>{
		res.status(200).json({code: "success", ride: newRide})
	}).catch(err =>{
		console.log(err);
		res.status(409).json({code: "error", message: "Error creating Ride."})
	})
};

// find a ride
export const getRideDetails: RequestHandler = async (req, res, next) => {
	const id = req.query.id;
	const ride = await Ride.findById({_id:id});
	res.status(200).json({code: "success", ride: ride})
};