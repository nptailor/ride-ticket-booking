import { RequestHandler } from 'express';
import { Ticket } from '../Models/Ticket';
import { Ride } from '../Models/Rides';

// book a ticket
export const bookTicket: RequestHandler = async (req, res, next) => {
	const { ticket } = req.body;
	const newTicket = new Ticket(ticket);
	const rideDetails = await Ride.findById({ _id: newTicket.rideId })

	if (rideDetails) {
		const ticketCountForTheDate: Number = await Ticket.count({ rideId: newTicket.rideId, date: newTicket.date });
		if (rideDetails.seatsPerDay > ticketCountForTheDate) {
			newTicket.save().then((createdTicket) => {
				res.status(200).json({ code: "success", ticket: createdTicket })
			}).catch((error) => {
				console.log("Error: ");
				console.log({ error });
				res.status(500).json({ code: "error", message: "Error creating ticket." })
			})
		} else {
			res.status(409).json({ code: "error", message: "Ride is fully booked" })
		}
	} else {
		res.status(409).json({ code: "error", message: "Ride not found." })
	}
};