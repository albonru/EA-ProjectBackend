import { Request, Response } from 'express';
import User from '../model/User';
import Report from '../model/Report';

const newReport = async (req: Request, res: Response) => {
	try {
		const {type, date, text, level} = req.body;
		const nwRprt = new Report({
			user: req.params.user_id,
            type,
			date,
            text,
            level,
		});
		await nwRprt.save().catch(Error);
        await User.updateOne(
			{ _id: req.params.user_id },
			{ $addToSet: { myReport: nwRprt } }
		);
		res.status(200).json({ auth: true });

	}
	catch {
		res.status(400).json({ message: 'User not found' });
	}
};
const deleteReport = async (req: Request, res: Response) => {
    try {
		const _id = req.params._id;
		const report = await Report.findById(_id)
		if (!report) {
			res.status(400).json({ message: 'Report not found' });
		}
		await Report.findByIdAndDelete(_id).catch(Error);
		res.status(200).json({ auth: true });
	}
	catch (err) {
		res.status(400).json({ message: 'Error', err });
	}
}
const getall = async (req: Request, res: Response) => {
    const reports = await Report.find(); // .populate('user');
	res.json(reports);
}
const getOne = async (req: Request, res: Response) => {
    try {
		const report = await Report.findById(req.params.id);
		res.json(report);
	}
	catch (err) {
		res.status(400).send({ message: 'Report not found', err });
	}
}
export default {
	newReport,
    deleteReport,
    getall,
    getOne
};