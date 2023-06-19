import { RequestHandler } from 'express';
import { User } from '../Models/User';

// create a new user
export const addUser: RequestHandler = (req, res, next) => {
	const { user } = req.body;
	new User(user).save().then((newUser) => {
		res.status(200).json({ code: "success", user: newUser });
	}).catch(err =>{
		console.log(err);
		res.status(409).json({code: "error", message: "Error creating user."})
	});
};