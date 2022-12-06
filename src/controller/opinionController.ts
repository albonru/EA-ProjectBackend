import User from '../model/User';
import Opinion from "../model/Opinion";
import Parking from "../model/Parking";
import { Request, Response } from 'express';

const opinion = async (req: Request, res: Response) => {
	const { user, parking, date, description, score } = req.body;
    const customer = await User.findById(user);
    const parkingopin = await Parking.findById(parking);
    const newOpinion = new Opinion({
		user: customer._id,
        parking: parkingopin._id,
		date,
		description,
        score
	});
	await newOpinion.save();
	await User.updateOne(
		{ _id: user },
		{ $addToSet: { myOpinions: newOpinion._id } }
	);
	res.status(200).json({ auth: true });
};

const getall = async (req: Request, res: Response) => {
	const opinions3 = await Opinion.find();
	res.json(opinions3);
};

const cancel = async (req: Request, res: Response) => {
	try {
		const opinion1 = await Opinion.findById(req.params.id);
	}
	catch(err) {
		return res.status(400).send({ message: 'Opinion does not exist', err });
	}
	try {
		const opinion1 = await Opinion.findById(req.params.id);
		await User.updateOne(
			{ _id: opinion1.user },
			{ $pull: { myOpinions: opinion1._id } }
		);
		await Opinion.deleteOne({ _id: req.params.id });
		res.status(200).json({ auth: true });
	}
	catch(err) {
		return res.status(500).send({ message: 'Could not delete Opinion', err});
	}
};

export default {
	opinion,
	getall,
	cancel
};