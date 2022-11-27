import Report from '../model/Report';
import User from '../model/User';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
	const { reportingUser, description, type } = req.body;
	try {
		const userReporting = await User.findOne({ email: reportingUser });
		const newReport = new Report({
			reportingUser: userReporting._id,
			description,
			type,
			closed: 0
		});
		await newReport.save().catch(Error);
		await User.updateOne(
			{ email: reportingUser },
			{ $addToSet: { myReports: newReport._id } }
		);
		res.status(200).json({ auth: true });
	}
	catch(err) {
		return res.status(400).json({ message: 'Could not create report', err });
	}
};

const getall = async (req: Request, res: Response) => {
	const users = await Report.find();
	res.json(users);
};

const getone = async (req: Request, res: Response) => {
	try {
		const report1 = await Report.findById(req.params.id);
		res.json(report1);
	}
	catch(err) {
		return res.status(404).send('Could not find report');
	}
};

const getByUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user.myReports);
	}
	catch(err) {
		return res.status(404).send('The user does not exist');
	}
};

const edit = async (req: Request, res: Response) => {
	const _id = req.params.id;
	const { description, type } = req.body;
	try {
		const report2 = await Report.findByIdAndUpdate(_id, {
			description,
			type
		}, {new: true});
		return res.json(report2);
	}
	catch(err) {
		res.status(400).json({ message: 'Report not found', err });
	}
}

const deleteReport = async (req: Request, res: Response) =>  {
	try {
		const _id = req.params.id;
        const report3 = await Report.findById(_id);
        await User.updateOne(
			{ _id:  report3.reportingUser },
			{ $pull: { myReports: report3._id } }
		);
		await Report.findByIdAndDelete({ _id });
		res.status(200).json({ status: 'Report removed' });
	}
	catch(err) {
		res.status(400).json({ message: 'Report not found', err });
	}
}

const changeStatus = async (req: Request, res: Response) => {
	const _id = req.params.id;
	const { closed } = req.body;
	try {
		const report4 = await Report.findByIdAndUpdate(_id, {
			closed
		}, {new: true});
		return res.json(report4);
	}
	catch(err) {
		res.status(400).json({ message: 'Report not found', err });
	}
}

export default {
	create,
	getall,
	getone,
    getByUser,
    edit,
    deleteReport,
	changeStatus
};