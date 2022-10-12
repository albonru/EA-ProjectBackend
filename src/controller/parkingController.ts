import Parking from '../model/Parking';
import User from '../model/User';
import Address from '../model/Address';
import Opinion from '../model/Opinion';
import { Request, Response } from 'express';


const register = async (req: Request, res: Response) => {
	try { 
		const user = req.body.user;
		const name = req.body.name;
    	const type = req.body.type;
    	const price = req.body.price;
    	const size = req.body.size;
    	const difficulty = req.body.difficulty;
    	const score = req.body.score;

		const user1 = await User.findOne({ name: user });
		if (!user1) {
			return res.status(400).json({ message: 'User not found' });
		}
		// const address1 = await Address.findOne({ name: user });
		// if (!address1) {
		//	return res.status(400).json({ message: 'Address not found' });
		// }
		
		const newParking = new Parking({
			name,
			user: user1._id,
        	type,
        	price, 
        	size,
        	difficulty,
        	score,
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
		const id = req.body.id;
		const userID = req.body.user;
    	const type = req.body.type;
    	const price = req.body.price;
    	const size = req.body.size;
    	const difficulty = req.body.difficulty;
    	const score = req.body.score;
    	const direction = req.body.direction;
		const findtransport = await Parking.findOne({ id, user: userID, type, price, size, difficulty, score});
		if (!findtransport) {
			return res.status(400).json({ message: 'Parking not found' });
		}
		await Parking.findByIdAndDelete(findtransport._id);
		res.status(200).json({ auth: true });
	}
	catch {
		return res.status(400).json({ message: 'Error' });
	}
};

const getall = async (req: Request, res: Response) => {
	const bookings = await Parking.find().populate('user');
	res.json(bookings);
};

export default {
	register,
	cancel,
	getall
};