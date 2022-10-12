import User from "src/model/User";
import Opinion from "src/model/Opinion";
import Parking from "src/model/Parking";
import { Request, Response } from 'express';

const Opinion = async (req: Request, res: Response) => {
	const { user, parking, date, description, puntuacio } = req.body;
    const customer = await User.findOne({ name: user });
    const parkingopin = await Parking.findById(parking);
    const newOpinion = new Opinion({
		user: customer._id
        parking: parkingopin._id,
		date: date,
		description: description,
        puntuacio: puntuacio
	});
await newOpinion.save();
res.status(200).json({ auth: true });
};

