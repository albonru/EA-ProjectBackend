import Parking, { IParking } from '../model/Parking';
import User from '../model/User';
import { Request, Response } from 'express';


const register = async (req: Request, res: Response) => {
	try {
		const { type, price, size, difficulty,
			country, city, street, streetNumber, spotNumber, longitude, latitude, range} = req.body;
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
			score: 0,
			longitude,
			latitude,
			range
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

const postoffice = async (req: Request, res: Response) => {
	try {
		const { type, price, size, difficulty,
			country, city, street, streetNumber, spotNumber } = req.body;
		const user8 = await User.findOne({ email: req.body.email });
			const newParking1 = new Parking({
			user: user8._id,
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
			score: 0,
			longitude: 0,
			latitude: 0,
			range: ""
		});
		await newParking1.save().catch(Error);
		await User.updateOne(
			{ _id: user8._id },
			{ $addToSet: { myParkings: newParking1._id } }
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

const canceloffice = async (req: Request, res: Response) => {
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

const filter = async (req: Request, res: Response) => {
	const { pmax, pmin, smin, type, size, sortby, firstdate, lastdate } = req.body;
	const allparkings: IParking[] = await Parking.find();
	let filteredparkings: IParking[] = [];
	if (type === 'any' && size === 'any') {
		for (const p of allparkings) {
			if ((p.price <= pmax) && (p.price >= pmin) && (p.score >= smin)) {
				filteredparkings.push(p);
			}
		}
	} else if (type === 'any' && size !== 'any') {
		for (const p of allparkings) {
			if ((p.price <= pmax) && (p.price >= pmin) && (p.score >= smin)
					&& (p.size === size)) {
				filteredparkings.push(p);
			}
		}
	}
	else if (type !== 'any' && size === 'any') {
		for (const p of allparkings) {
			if ((p.price <= pmax) && (p.price >= pmin) && (p.score >= smin)
					&& (p.type === type)) {
				filteredparkings.push(p);
			}
		}
	} else {
		for (const p of allparkings) {
			if ((p.price <= pmax) && (p.price >= pmin) && (p.score >= smin)
					&& (p.type === type) && (p.size === size)) {
				filteredparkings.push(p);
			}
		}
	}
	for (const p of allparkings) {
		if ((p.price <= pmax) && (p.price >= pmin) && (p.score >= smin)
				&& (p.type === type) && (p.size === size)) {
			filteredparkings.push(p);
		}
	}
	if (firstdate !== '') {
		for (const p of filteredparkings) {
			const partsrange = p.range.split(' - ');
			const rangefirst = partsrange[0].split('/');
			const rangelast = partsrange[1].split('/');
			if ((rangefirst > firstdate) || (rangelast < lastdate)) {
				filteredparkings = filteredparkings.filter(d => d._id !== p._id);
			}
		}
	}
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

const getByStreet = async (req: Request, res: Response) => {
	const street = req.params.street;
	try {
		const parking = await Parking.findOne({ street });
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
const getLocation = async (req: Request, res: Response) => {
	try {
		const parking = await Parking.findById(req.params.id);
		res.json(parking);
	}
	catch (err) {
		res.status(400).send({ message: 'Parking not found', err });
	}
}

const getowner = async (req: Request, res: Response) => {
	try{
		const _id = req.body._id;
		const parking = await Parking.findById(_id);
		if(parking != null) {
			const user = await User.findOne(
				{ _id: parking.user });
			if (user!= null){
			res.status(200).json(user);
			}
			else{
				res.status(401).send({ message: 'Cannot find the parking'});
			}
		}
		else{
			res.status(402).send({ message: 'Cannot find the parking'});
		}
	}
	catch (err) {
		res.status(403).send({ message: 'Cannot find the parking', err });
	}
}

export default {
	register,
	postoffice,
	cancel,
	canceloffice,
	getall,
	filter,
	getowner,
	getOne,
	getByStreet,
	update,
	updateAddress,
	getLocation
};