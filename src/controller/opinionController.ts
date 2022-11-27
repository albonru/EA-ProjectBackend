import User from '../model/User';
import Opinion from "../model/Opinion";
import Parking from "../model/Parking";
import { Request, Response } from 'express';

const opinion = async (req: Request, res: Response) => {
	const { user, parking, date, description, puntuacio } = req.body;
    const customer = await User.findById(user);
    const parkingopin = await Parking.findById(parking);
    const newOpinion = new Opinion({
		us_id: customer._id,
        park_id: parkingopin._id,
		date,
		description,
        puntuacio
	});
	await newOpinion.save();
	await User.updateOne(
		{ _id: user },
		{ $addToSet: { myOpinions: newOpinion._id } }
	);
	res.status(200).json({ auth: true });
};

// const getallOpinionsPark = async (req: Request, res: Response) => {
// 	const opinions = await Opinion.findById(req.params.id);
// 	res.json(opinions);
// };

// const getallOpinionsUser = async (req: Request, res: Response) => {
// 	const opinions = await Opinion.findById(req.params.id);
// 	res.json(opinions);
// };

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
			{ _id: opinion1.us_id },
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
	// getallOpinionsPark,
    // getallOpinionsUser,
	getall,
	cancel
};