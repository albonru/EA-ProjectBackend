import User from '../model/User';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';

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
		const user = await User.findById(req.params.id, { password: 0 }); // .populate('myParkings').populate('myBookings');
		res.json(user);
	}
	catch(err) {
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
		res.status(400).json({ message: 'User not found', err });
	}
}

const deleteUser = async (req: Request, res: Response) =>  {
	try {
		const _id = req.params.id;
		await User.findByIdAndDelete({ _id });
		res.status(200).json({ status: 'User deleted' });
	}
	catch(err) {
		res.status(500).json({ message: 'User not found', err });
	}
}

export default {
	register,
	login,
	profile,
	getall,
	changePass,
	update,
	deleteUser
};