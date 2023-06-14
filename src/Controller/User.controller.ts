import { RequestHandler } from 'express';
import { User } from '../Models/User';

// create a new user
export const addUser: RequestHandler = (req, res, next) => {
	const { user } = req.body;
	const newUser = new User(user).save();
	res.status(200).json({ code: "success", user: newUser })
};