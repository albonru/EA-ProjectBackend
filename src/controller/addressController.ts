import Booking from '../model/Booking';
import Parking from '../model/Parking';
import User from '../model/User';
import Address from '../model/Address';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
	// const user = req.body.user;
	const { country, city, street, spotNumber } = req.body;
	// const street = req.body.street;
	// const spotNumber = req.body.spotNumber;
	// const parking = await Parking.findById();
	// if (!parking) {
	// 	return res.status(400).json({ message: 'User not found' });
	// }
	const newAddress = new Address({
		country,
		city,
		street,
		spotNumber
	});
	await newAddress.save();
	res.status(200).json(newAddress);
};

const cancel = async (req: Request, res: Response) => {
	const address = await Address.findById(req.params.id);
	if (!address) {
		return res.status(404).send('This address does not exist');
	}
	await Address.deleteOne({ address: req.body.address }); //mirar perque no borra
	res.status(200).json(address); 
};

const getall = async (req: Request, res: Response) => {
	const addresses = await Address.find();
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
	// changeStreet
};
