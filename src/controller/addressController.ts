import Booking from '../model/Booking';
import User from '../model/User';
import Address from '../model/Address';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
	const user = req.body.user;
	const street = req.body.street;
	const spotNumber = req.body.spotNumber;
	const user1 = await User.findOne({ name: user });
	if (!user1) {
		return res.status(400).json({ message: 'User not found' });
	}
	const newAddress = new Address({
		street,
		spotNumber,
		user: user1._id
	});
	await newAddress.save();
	res.status(200).json({ auth: true });
};

const cancel = async (req: Request, res: Response) => {
	const address1 = await Address.find({name: req.body.name }).populate('user');
	if (!address1) {
		return res.status(404).send('This address does not exist');
	}
	await Address.deleteOne({ user: req.body.user });
	res.status(200).json({ auth: true });
};

const getall = async (req: Request, res: Response) => {
	const addresses = await Address.find().populate('user');
	res.json(addresses);
};

const getone = async (req: Request, res: Response) => {
	const address = await Address.findById(req.params.id);
	res.json(address);
};

/*const changeStreet = async (req: Request, res: Response) => {
	const address = await Address.findById(req.params.id);
	if (!address) {
		return res.status(404).send('No street found.');
	}
		let newstreet = req.body.newstreet;
		address.street = newstreet;
		await address.save();
		res.json({ status: 'Address Updated' });
};*/

export default {
	create,
	cancel,
	getall,
	getone,
	//changeStreet
};
