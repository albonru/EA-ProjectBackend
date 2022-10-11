import User from '../model/User';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
	let { name, email, password } = req.body;
	// VERIFICAR EMAIL ES EMAIL
	// VERIFICAR QUE NO EXISTEIXI JA
	password = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
	const points = 0;
	const newUser = new User({ 
		name: name, 
		email: email, 
		password: password, 
		points: points 
	});
	await newUser.save();
	const token = jwt.sign({ id: newUser._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};

const login = async (req: Request, res : Response) => {
	const user = await User.findOne({ email: req.body.email });
	// FERHO AMB TRY CATCH
	if (!user) {
		return res.status(404).send('The email does not exist');
	}
	const validPassword = CryptoJS.AES.decrypt(<string>user.password, 'secret key 123').toString(CryptoJS.enc.Utf8);
	if (!validPassword) {
		return res.status(401).json({ auth: false, token: null });
	}
	const token = jwt.sign({ id: user._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.json({ auth: true, token });
};

const profile = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId, { password: 0 });
	// FER AMB TRY CATCH
	if (!user) {
		return res.status(404).send('No user found.');
	}
	res.json(user);
};

const getall = async (req: Request, res: Response) => {
	const users = await User.find();
	res.json(users);
};

const getone = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	// FER TRY CATCH
	res.json(user);
};

const changePass = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	// FER TRY CATCH
	if (!user) {
		return res.status(404).send('No user found.'); // catch
	}
	if(req.body.password === CryptoJS.AES.decrypt(<string>user.password, 'secret key 123').toString(CryptoJS.enc.Utf8)){
		let newpassword = req.body.newpassword;
		newpassword = CryptoJS.AES.encrypt(newpassword, 'secret key 123').toString();
		user.password = newpassword;
		await user.save();
		res.json({ status: 'User Updated' });
	}
	else{
		res.json({ status: 'Wrong password' });
	}
};

const update = async (req: Request, res: Response) => {
	const _id = req.params.id;
	const { name, email, language } = req.body;
	// CONFIRMAR QUE EXISTEIX
	const user = await User.findByIdAndUpdate(_id, {
		name,
		email,
		language
	}, {new: true});
	return res.json(user);
}

export default {
	register,
	login,
	profile,
	getall,
	getone,
	changePass,
	update
};