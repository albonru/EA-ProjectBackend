import User from '../model/User';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import Opinion from '../model/Opinion';
import Booking from '../model/Booking';
import Parking from '../model/Parking';

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
	catch (err) {
		res.status(500).json({ message: 'Could not create user', err });
	}
	const token = jwt.sign({ id: newUser._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};

const profile = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id, { password: 0 }); // .populate('myParkings').populate('myBookings');
		res.json(user);
	}
	catch (err) {
		return res.status(404).send('The user does not exist');
	}
};

const getall = async (req: Request, res: Response) => {
	const users = await User.find(); // .populate('myParkings').populate('myBookings');
	res.json(users);
};

const changePass = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		if (req.body.password === CryptoJS.AES.decrypt(user.password as string, 'secret key 123').toString(CryptoJS.enc.Utf8)) {
			let newpassword = req.body.newpassword;
			newpassword = CryptoJS.AES.encrypt(newpassword, 'secret key 123').toString();
			user.password = newpassword;
			await user.save();
			res.json({ status: 'User Updated' });
		}
		else {
			res.json({ status: 'Wrong password' });
		}
	}
	catch (err) {
		res.status(500).json({ message: 'User not found', err });
	}
};

const update = async (req: Request, res: Response) => {
	const _id = req.params.user_id;
	const { name, email } = req.body;
	try {
		const user = await User.findByIdAndUpdate(_id, {
			name,
			email
		}, { new: true });
		return res.json(user);
	}
	catch (err) {
		res.status(400).json({ message: 'User not found', err });
	}
}

const deleteUser = async (req: Request, res: Response) => {
	try {
		const _id = req.params.user_id;
		await User.findByIdAndDelete({ _id });
		res.status(200).json({ status: 'User deleted' });
	}
	catch (err) {
		res.status(500).json({ message: 'User not found', err });
	}
}
const getmyOpinions = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.users_id);
		res.json(user.myOpinions);
	}
	catch (err) {
		res.status(400).send({ message: 'User not found', err });
	}
}
const getmyFavorites = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.user_id);
		res.json(user.myFavorites);
	}
	catch (err) {
		res.status(400).send({ message: 'User not found', err });
	}
}
const getmyParkings = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.user_id);
		res.json(user.myParkings);
	}
	catch (err) {
		res.status(400).send({ message: 'User not found', err });
	}
}
const getmyBookings = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.user_id);
		res.json(user.myBookings);
	}
	catch (err) {
		res.status(400).send({ message: 'User not found', err });
	}
}
const updatemyOpinions = async (req: Request, res: Response) => {
	try {
		const _id = req.params.user_id;
		const { parking_id, date, description, points } = req.body;
		const user1 = User.findById(_id);
		const parking1 = Parking.findById(parking_id);
		const newOpinion = new Opinion({
			user: (await user1)._id,
			parking: (await parking1)._id,
			date,
			description,
			points
		});
		await newOpinion.save().catch(Error);
		await User.updateOne(
			{ _id: user1 },
			{ $addToSet: { myOpinions: newOpinion._id } }
		);
		res.status(200).json({ auth: true });
	}
	catch (err) {
		res.status(400).send({ message: 'Cannot update my opinions list', err });
	}
}
const updatemyBookings = async (req: Request, res: Response) => {
	try {
		const _id = req.params.id;
		const { parking_id, arrival, departure, cost } = req.body;
		const user1 = User.findById(_id);
		const parking1 = Parking.findById(parking_id);
		const newBooking = new Booking({
			customer: (await user1)._id,
			parking: (await parking1)._id,
			arrival,
			departure,
			cost
		});
		await newBooking.save().catch(Error);
		await User.updateOne(
			{ _id: user1 },
			{ $addToSet: { myBookings: newBooking._id } }
		);
		res.status(200).json({ auth: true });
	}
	catch (err) {
		res.status(400).send({ message: 'Cannot update my booking list', err });
	}
}
const updatemyFavorites = async (req: Request, res: Response) => {
	try {
		const _id = req.params.id;
		const { parking_id } = req.body;
		const user1 = User.findById(_id);
		const parking1 = Parking.findById(parking_id);
		await User.updateOne(
			{ _id: user1 },
			{ $addToSet: { myFavorites: parking_id } }
		);
		res.status(200).json({ auth: true });
	}
	catch (err) {
		res.status(400).send({ message: 'Cannot update my favorite list', err });
	}
}

export default {
	register,
	profile,
	getall,
	changePass,
	update,
	deleteUser,
	getmyOpinions,
	getmyFavorites,
	getmyParkings,
	getmyBookings,
	updatemyOpinions,
	updatemyBookings,
	updatemyFavorites
};