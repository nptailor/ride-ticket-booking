import mongoose from "mongoose";

// get db url
const url = "mongodb://0.0.0.0:27017/theme_park_rides";


export async function connect() {
	// Use connect method to connect to the server
	await mongoose.connect(url);
	console.log("Connected to database successfully.")
}


