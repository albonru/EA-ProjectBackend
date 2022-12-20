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
		points: 0,
		myBookings: [],
		myFavorites: [],
		myOpinions: [],
		myParkings: [],
		deleted: false
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
		const user = await User.findById(req.params.id, { password: 0 }).populate('myParkings').populate('myBookings');
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
		const user = await User.findById(req.body._id);
		const comp1 = String(req.body.password);
		const comp2 = String(CryptoJS.AES.decrypt(user.password as string, 'secret key 123').toString(CryptoJS.enc.Utf8));
		const equals = comp1.localeCompare(comp2);
		if (equals === 0) {
			let newpassword = req.body.newpassword;
			newpassword = CryptoJS.AES.encrypt(newpassword, 'secret key 123').toString();
			user.password = newpassword;
			await user.save();
			res.status(200).json({ status: 'User Updated' });
		}
		else {
			res.json({ status: 'Wrong password' });
		}
	}
	catch (err) {
		res.status(500).json({ message: 'User not found', err });
	}
};

const updateName = async (req: Request, res: Response) => {
	const _id = req.params.user_id;
	const name = req.body.name;
	try {
		const user = await User.findByIdAndUpdate(_id, {
			name
		}, { new: true });
		return res.json(user);
	}
	catch (err) {
		res.status(400).json({ message: 'User not found', err });
	}
}

const updateEmail = async (req: Request, res: Response) => {
	const _id = req.params.user_id;
	const email = req.body.email;
	try {
		const user = await User.findByIdAndUpdate(_id, {
			email
		}, { new: true });
		return res.json(user);
	}
	catch (err) {
		res.status(400).json({ message: 'User not found', err });
	}
}

const deleteUser = async (req: Request, res: Response) => {
	const _id = req.params.user_id;
	try {
		const user = await User.findByIdAndUpdate(_id, {
			deleted: true
		}, { new: true });
		try {
			const parkings = user.myParkings;
			for (const p of parkings) {
				const parking = await Parking.findById(p);
				await Parking.findByIdAndDelete(p).catch(Error);
				await User.updateOne(
					{ _id: parking.user },
					{ $pull: { myParkings: parking._id } }
				);
			}
		}
		catch { return res.status(200).json(user); }
		return res.status(200).json(user);
	}
	catch (err) {
		res.status(400).json({ message: 'User not found', err });
	}
}

const activate = async (req: Request, res: Response) => {
	const email = req.body.email;
	const user1 = await User.findOne({ email });
	const _id = user1._id;
	try {
		const user = await User.findByIdAndUpdate(_id, {
			deleted: false
		}, { new: true });
		return res.json(user);
	}
	catch (err) {
		res.status(400).json({ message: 'User not found', err });
	}
}

const checkemail = async (req: Request, res: Response) => {
	const email = req.body.email;
	try {
		const user1 = await User.findOne({ email });
		if (user1.id != null) {
			res.status(409).json({ status: 'Email already in use!' });
		}
		else {
			res.status(200).json({ status: 'Email adress is free!' });
		}
	} catch (err) {
		res.status(200).json({ message: 'User not found', err });
	}
}

export default {
	register,
	profile,
	getall,
	changePass,
	updateName,
	updateEmail,
	deleteUser,
	activate,
	checkemail
};