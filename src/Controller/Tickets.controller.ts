import { RequestHandler } from 'express';
import { Ticket } from '../Models/Ticket';
import { Ride } from '../Models/Rides';

// book a ticket
export const bookTicket: RequestHandler = async (req, res, next) => {
	const { ticket } = req.body;
	const newTicket = new Ticket(ticket);

	Ride.findOneAndUpdate({ _id: newTicket.rideId }, { $inc: { availableSeats: -1 } }, { new: true, runValidators: true, })
		.then(async (updatedRideSeats) => {
			
			if(!updatedRideSeats){
				console.log("Ride not available");
				return res.status(409).json({ code: "error", message: "Ride not available." })
			}

			if (Number(updatedRideSeats.availableSeats) >= 0) {
				newTicket.save().then((createdTicket) => {
					res.status(200).json({ code: "success", ticket: createdTicket })
				}).catch(async (error) => {
					console.log("Error creating ticket");
					await Ride.updateOne({ _id: newTicket.rideId }, { $inc: { availableSeats: 1 } })
					res.status(500).json({ code: "error", message: error.message })
				})
			} else {
				console.log("Seats not available");
				await Ride.updateOne({ _id: newTicket.rideId }, { $inc: { availableSeats: 1 } })
				res.status(409).json({ code: "error", message: "Seats not available." })
			}
		})
};