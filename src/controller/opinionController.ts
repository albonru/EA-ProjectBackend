import User from '../model/User';
import Opinion from "../model/Opinion";
import Parking from "../model/Parking";
import { Request, Response } from 'express';

const opinion = async (req: Request, res: Response) => {
	const { user, parking, date, description, puntuacio } = req.body;
    const customer = await User.findOne({ name: user });
    
    const parkingopin = await Parking.findById(parking);
   
    const newOpinion = new Opinion({
		user: customer._id,
        parking: parkingopin._id,
		date: date,
		description: description,
        puntuacio: puntuacio
	});
await newOpinion.save();
res.status(200).json({ auth: true });
};
const getallOpinionsPark = async (req: Request, res: Response) => {
	const opinions = await Opinion.findById(req.params.parking._id);
	res.json(opinions);
};
const getallOpinionsUser = async (req: Request, res: Response) => {
	const opinions = await Opinion.findById(req.params.user._id);
	res.json(opinions);
};
export default {
	opinion,
	getallOpinionsPark,
    getallOpinionsUser
};
