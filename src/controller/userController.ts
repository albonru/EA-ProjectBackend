import User from '../model/User';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import Opinion from '../model/Opinion';
import Booking from '../model/Booking';
import Parking from '../model/Parking';
import Chat, { IChat } from '../model/Chat';
import IJwtPayload from '../model/JWTPayload';

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

const registergoogle = async (req: Request, res: Response) => {
	const name = req.body.name;
	const email = req.body.email;
	const u = await User.findOne({ email });
	if (u) {
		return res.status(400).json({ message: 'Already registered'});
	}
	const password1 = CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString();
	const newUser1 = new User({
		name,
		email,
		password: password1,
		points: 0,
		myBookings: [],
		myFavorites: [],
		myOpinions: [],
		myParkings: [],
		deleted: false
	});
	try {
		newUser1.save();
	}
	catch(err) {
		res.status(500).json({ message: 'Could not create user', err });
	}
	const token = jwt.sign({ id: newUser1._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
}

const logingoogle = async (req: Request, res: Response) => {
	const email = req.body.email;
	try {
		const user2 = await User.findOne({ email });
		if (!user2) return res.status(404).json({ message: 'User not found' });
		if (user2.deleted) {
			user2.deleted = false;
		}
		const sessio = { 'user_id': user2.id } as IJwtPayload;
        const token = jwt.sign(sessio, 'clavesecreta', {
            expiresIn: 86400, // 24 hours
        });
        const id = user2.id;
        return res.status(200).json({ auth: true, token, id });
	}
	catch(err) {
		res.status(500).send('Internal server error');
	}
}

const profile = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id, { password: 0 }).populate('myParkings myBookings myFavorites');
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

const deleteoffice = async (req: Request, res: Response) => {
	const _id = req.params.id;
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
const AddtomyFavorites = async(req: Request, res: Response) => {
	try {
		const _id = req.body._id;
		const parking = await Parking.findById(_id)
		if (!parking) {
			res.status(400).json({ message: 'Parking not found' });
		}
		await User.updateOne(
			{ _id: req.params.user_id },
			{ $addToSet: { myFavorites: parking._id } }
		);
		res.status(200).json({ auth: true });
	}
	catch (err) {
		res.status(400).json({ message: 'Error', err });
	}


};
const cancelMyFavorite = async (req: Request, res: Response) => {
	try {
		const _id = req.body._id;
		const parking = await Parking.findById(_id)
		if (!parking) {
			res.status(400).json({ message: 'Parking not found' });
		}
		await User.updateOne(
			{ _id: req.params.user_id },
			{ $pull: { myFavorites: parking._id } }
		);
		res.status(200).json({ auth: true });
	}
	catch (err) {
		res.status(400).json({ message: 'Error', err });
	}
};

const getchats = async (req: Request, res: Response) => {
	const chats123 = [];
try{
	const chats = await Chat.find({ $or: [{client1:req.body._id}, {client2:req.body._id}]});
	chats123.push(chats);
	res.status(200).json(chats123);
}
catch{
	res.status(200).json(chats123);
}
}


const getchat = async (req: Request, res: Response) => {
try{
	const {id} = req.body;
	const chat1 = await Chat.findById(id).populate('messages');
		if(chat1 != null){
			res.status(200).json(chat1.messages);
		}
	}
	catch{
			res.status(404);
		}
	}

export default {
	register,
	registergoogle,
	logingoogle,
	profile,
	getall,
	changePass,
	updateName,
	updateEmail,
	deleteUser,
	deleteoffice,
	activate,
	checkemail,
	AddtomyFavorites,
	cancelMyFavorite,
	getchats,
	getchat
};