import Parking from '../model/Parking';
import User from '../model/User';
import { Request, Response } from 'express';


const register = async (req: Request, res: Response) => {
	try {
		const { email, type, price, size, difficulty,
			country, city, street, streetNumber, spotNumber } = req.body;

		const user1 = await User.findOne({ email });
		if (!user1) {
			res.status(400).json({ message: 'User not found',email, user1 });
		}
		// const address1 = await Address.findOne({ name: user });
		// if (!address1) {
		// 	return res.status(400).json({ message: 'Address not found' });
		// }
		const newParking = new Parking({
			user: user1._id,
			type,
			price,
			size,
			difficulty,
			country,
			city,
			street,
			streetNumber,
			spotNumber
			// address: address1._id
		});
		await newParking.save().catch(Error);
		await User.updateOne(
			{ _id: user1 },
			{ $addToSet: { myParkings: newParking._id } }
		);
		res.status(200).json({ auth: true });
	}
	catch {
		res.status(400).json({ message: 'User not found' });
	}
};

const cancel = async (req: Request, res: Response) => {
	try {
		const _id = req.params.id;
		const parking = await Parking.findById(_id)
		if (!parking) {
			res.status(400).json({ message: 'Parking not found' });
		}
		await Parking.findByIdAndDelete(_id).catch(Error);
		await User.updateOne(
			{ _id: parking.user },
			{ $pull: { myParkings: parking._id } }
		);
		res.status(200).json({ auth: true });
	}
	catch (err) {
		res.status(400).json({ message: 'Error', err });
	}
};

const getall = async (req: Request, res: Response) => {
	const parkings = await Parking.find(); // .populate('user');
	res.json(parkings);
};

const getOne = async (req: Request, res: Response) => {
	try {
		const parking = await Parking.findById(req.params.id);
		res.json(parking);
	}
	catch (err) {
		res.status(400).send({ message: 'Parking not found', err });
	}
}

const update = async (req: Request, res: Response) => {
	const _id = req.params.id;
	const { type, price, size, difficulty } = req.body;
	try {
		const parking = await Parking.findByIdAndUpdate(_id, {
			type,
			price,
			size,
			difficulty
		}, {new: true});
		return res.json(parking);
	}
	catch (err) {
		res.status(400).send({ message: 'Cannot update parking', err });
	}
}

const updateAddress = async (req: Request, res: Response) => {
	try {
		const _id = req.params.id;
		const { country, city, street, streetNumber, spotNumber } = req.body;
		const parking = await Parking.findByIdAndUpdate(_id, {
			country,
			city,
			street,
			streetNumber,
			spotNumber
		}, { new: true });
		res.json(parking);
	}
	catch (err) {
		res.status(400).send({ message: 'Cannot update parking address', err });
	}
}

export default {
	register,
	cancel,
	getall,
	getOne,
	update,
	updateAddress
};