import Parking, { IParking } from '../model/Parking';
import User from '../model/User';
import { Request, Response } from 'express';


const register = async (req: Request, res: Response) => {
	try {
		const { type, price, size, difficulty,
			country, city, street, streetNumber, spotNumber } = req.body;
		const newParking = new Parking({
			user: req.params.user_id,
			type,
			price,
			size,
			difficulty,
			country,
			city,
			street,
			streetNumber,
			spotNumber,
			opinions: [],
			score: 0
		});
		await newParking.save().catch(Error);
		await User.updateOne(
			{ _id: req.params.user_id },
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
		const _id = req.body._id;
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

const filter = async (req: Request, res: Response) => {
	const { pmax, pmin, smin, type, size, sortby } = req.body;
	const allparkings: IParking[] = await Parking.find();
	const filteredparkings: IParking[] = [];
	for (const p of allparkings) {
		if ((p.price <= pmax) && (p.price >= pmin) && (p.score >= smin)
				&& (p.type === type) && (p.size === size)) {
			filteredparkings.push(p);
		}
	}
	// de major a menor
	if (sortby === "score") {
		filteredparkings.sort(function (a, b) {
			if (a.score > b.score) {
				return -1;
			}
			if (a.score < b.score) {
				return 1;
			}
			return 0;
		});
	}
	// de menor a major
	if (sortby === "price") {
		filteredparkings.sort(function (a, b) {
			if (a.price < b.price) {
				return -1;
			}
			if (a.price > b.price) {
				return 1;
			}
			return 0;
		});
	}
	res.json(filteredparkings);
}

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
	const _id = req.body._id;
	const { price } = req.body;
	try {
		const parking = await Parking.findByIdAndUpdate(_id, {
			price
		},
		{new: true});
		return res.json(parking);

	}
	catch (err) {
		res.status(400).send({ message: 'Cannot update parking', err });
	}
}

const updateAddress = async (req: Request, res: Response) => {
	try {
		const _id = req.body._id;
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
	filter,
	getOne,
	update,
	updateAddress
};