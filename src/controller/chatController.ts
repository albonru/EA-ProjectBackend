import Parking from '../model/Parking';
import User from '../model/User';
import Chat from '../model/Chat';
import Message from '../model/Message';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
	const { parking2, client2, customer2 } = req.body;
	const parking1 = await Parking.findById(parking2);
	const client1 = await User.findOne({ name: client2 });
	const customer1 = await User.findOne({ name: customer2 });
	const messages1 = await Message.find();

	const newChat = new Chat({
		parking: parking1._id,
        client: client1._id,
		customer: customer1._id,
		messages: messages1,
	});
	await newChat.save();
	res.status(200).json({ auth: true });
};

const getallmessagesById = async (req: Request, res: Response) => {
	const messages2 = await Message.findById(req.params.id);
	res.json(messages2);
};

const getone = async (req: Request, res: Response) => {
	const chat1 = await Chat.findById(req.params.id);
	// FER TRY CATCH
	res.json(chat1);
};

export default {
	create,
	getallmessagesById,
	getone,
};