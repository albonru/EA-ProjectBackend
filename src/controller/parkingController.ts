import Parking from '../model/Parking';
import User from '../model/User';
import { Request, Response } from 'express';


const register = async (req: Request, res: Response) => {
	try {
		const user = req.body.user;
    	const type = req.body.type;
    	const price = req.body.price;
    	const size = req.body.size;
    	const difficulty = req.body.difficulty;

		const user1 = await User.findById(user);
		if (!user1) {
			return res.status(400).json({ message: 'User not found', user, user1 });
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
        	difficulty
        	// address: address1._id
		});
		await newParking.save();
		res.status(200).json({ auth: true });
	}
	catch {
		return res.status(400).json({ message: 'User not found' });
	}
};

const cancel = async (req: Request, res: Response) => {
	try {
		const _id = req.params.parkingId;
		// console.log("_id",_id);
		const parking = await Parking.findById(_id)
		if (!parking) {
			return res.status(400).json({ message: 'Parking not found' });
		}
		await Parking.findByIdAndDelete(_id);
		res.status(200).json({ auth: true });
	}
	catch (err){
		return res.status(400).json({ message: 'Error',err });
	}
};

const getall = async (req: Request, res: Response) => {
	const parkings = await Parking.find().populate('user');
	res.json(parkings);
};

const getOne = async (req: Request, res: Response) => {
	try {
		const parking = await Parking.findById(req.params.parkingId);
		res.json(parking);
	}
	catch(err) {
	 	return res.status(400).send({ message: 'Parking not found', err });
	}
}
const update = async (req: Request, res: Response) => {
	try{
		const _id = req.params.parkingId;
		const { type, price, size, difficulty,country, city, street, spotNumber } = req.body;
		const parking = await User.findByIdAndUpdate(_id, {
			type,
    		price,
    		size,
    		difficulty,
			country,
			city,
			street,
			spotNumber
		}, {new: true});
		return res.json(parking);
	}
	catch(err){
		return res.status(400).send({ message: 'Can not update parking', err });
	}
}
const updateAddress = async(req: Request, res: Response) => {
	try{
		const _id = req.params.parkingId;
		const {country, city, street, spotNumber } = req.body;
		const parking = await User.findByIdAndUpdate(_id, {
			country,
			city,
			street,
			spotNumber
		}, {new: true});
		return res.json(parking);
	}
	catch(err){
		return res.status(400).send({ message: 'Can not update parking address', err });
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