import { RequestHandler } from 'express';
import { Ticket } from '../Models/Ticket';
import { Ride } from '../Models/Rides';

// book a ticket
export const bookTicket: RequestHandler = async (req, res, next) => {
	const { ticket } = req.body;
	const newTicket = new Ticket(ticket);

	// find the ride and decrease the available seats by 1
	Ride.findOneAndUpdate({ _id: newTicket.rideId }, { $inc: { availableSeats: -1 } }, { new: true, runValidators: true, })
		.then(async (updatedRideSeats) => {
			// check if ride with the given id is present
			if (!updatedRideSeats) {
				console.log("Ride not available");
				return res.status(409).json({ code: "error", message: "Ride not available." })
			}
			// check if seats are available
			if (Number(updatedRideSeats.availableSeats) >= 0) {
				newTicket.save().then((createdTicket) => {
					res.status(200).json({ code: "success", ticket: createdTicket })
				}).catch(async (error) => {
					console.log("Error creating ticket");
					// error creating ticket : increase the available seats by 1
					await Ride.updateOne({ _id: newTicket.rideId }, { $inc: { availableSeats: 1 } })
					res.status(500).json({ code: "error", message: error.message })
				})
			} else {
				console.log("Seats for the ride not available");
				// seats for the ride  : increase the available seats by 1. This 
				await Ride.updateOne({ _id: newTicket.rideId }, { $inc: { availableSeats: 1 } })
				res.status(409).json({ code: "error", message: "Seats not available." })
			}
		})
};