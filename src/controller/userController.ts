import User from '../model/User';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import { Schema } from 'mongoose';

const register = async (req: Request, res: Response) => {
	const name = req.body.name;
	const email = req.body.email;
	let password = req.body.password;
	password = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
	const newUser = new User({
		name,
		email,
		password,
		points: 0
	});
	try {
		await newUser.save();
	}
	catch(err) {
		res.status(500).json({ message: 'Could not create user', err });
	}
	const token = jwt.sign({ id: newUser._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};

const login = async (req: Request, res : Response) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		const validPassword = CryptoJS.AES.decrypt(user.password as string, 'secret key 123').toString(CryptoJS.enc.Utf8);
		if (validPassword !== password) {
			return res.status(401).json({ auth: false, token: null });
		}
		const token = jwt.sign({ id: user._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
			expiresIn: 60 * 60 * 24
		});
		res.json({ auth: true, token });
	}
	catch(err) {
		res.status(404).send('Cant find user');
	}
};

const profile = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id, { password: 0 }).populate('myParkings').populate('myBookings');
		res.json(user);
	}
	catch(err) {
		return res.status(404).send('The user does not exist');
	}
};

const getall = async (req: Request, res: Response) => {
	const users = await User.find().populate('myParkings').populate('myBookings');
	res.json(users);
};

const changePass = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		if(req.body.password === CryptoJS.AES.decrypt(user.password as string, 'secret key 123').toString(CryptoJS.enc.Utf8)){
			let newpassword = req.body.newpassword;
			newpassword = CryptoJS.AES.encrypt(newpassword, 'secret key 123').toString();
			user.password = newpassword;
			await user.save();
			res.json({ status: 'User Updated' });
		}
		else{
			res.json({ status: 'Wrong password' });
		}
	}
	catch(err) {
		res.status(500).json({ message: 'User not found', err });
	}
};

const update = async (req: Request, res: Response) => {
	const _id = req.params.id;
	const { name, email } = req.body;
	try {
		const user = await User.findByIdAndUpdate(_id, {
			name,
			email
		}, {new: true});
		return res.json(user);
	}
	catch(err) {
		res.status(500).json({ message: 'User not found', err });
	}
}

const deleteUser = async (req: Request, res: Response) =>  {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ status: 'User deleted' });
	}
	catch(err) {
		res.status(500).json({ message: 'User not found', err });
	}
}

// const addParking = async (req: Request, res: Response) => {
// 	const _id = req.params.id;
// 	const parking = req.body.parking;
// 	try {
// 		const user = await User.findById(_id);
// 		let userparkings = user.myParkings;
// 		let newParkings = userparkings.push(parking);
// 		const user1 = await User.findByIdAndUpdate(_id, {
// 			myParkings: newParkings
// 		}, {new: true});
// 	}
// 	catch(err){
// 		res.status(500).json({ message: 'User not found', err });
// 	}
// }

async function addBooking(id: string, booking: string) {
	try {
		const user = await User.findById(id);
		const userbookings = user.myBookings;
		const newBookings = userbookings.push(new Schema.Types.ObjectId(booking));
		const user1 = await User.findByIdAndUpdate(id, {
			myBookings: newBookings
		}, {new: true});
		return '200OK';
	}
	catch(err) {
		return err;
	}
}

// const addBooking1 = async (req: Request, res: Response) => {
// 	const _id = req.params.id;
// 	const booking = req.body.booking;
// 	try {
// 		const user = await User.findById(_id);
// 		let userbookings = user.myBookings;
// 		let newBookings = userbookings.push(booking);
// 		const user1 = await User.findByIdAndUpdate(_id, {
// 			myBookings: newBookings
// 		}, {new: true});
// 	}
// 	catch(err){
// 		res.status(500).json({ message: 'User not found', err });
// 	}
// }

// const addOpinion = async (req: Request, res: Response) => {
// 	const _id = req.params.id;
// 	const opinion = req.body.opinion;
// 	try {
// 		const user = await User.findByIdAndUpdate(_id, {

// 		}, {new: true});
// 	}
// 	catch(err){
// 		res.status(500).json({ message: 'User not found', err });
// 	}
// }

// const addFavorite = async (req: Request, res: Response) => {
// 	const _id = req.params.id;
// 	const favorite = req.body.favorite;
// 	try {
// 		const user = await User.findByIdAndUpdate(_id, {

// 		}, {new: true});
// 	}
// 	catch(err){
// 		res.status(500).json({ message: 'User not found', err });
// 	}
// }

export default {
	register,
	login,
	profile,
	getall,
	changePass,
	update,
	deleteUser,
	// addParking,
	addBooking,
	// addOpinion,
	// addFavorite
};