import Parking from '../model/Parking';
import User from '../model/User';
import Chat from '../model/Chat';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
	const { parking, client, customer } = req.body;
	try {
		const parking1 = await Parking.findById(parking);
		const client1 = await User.findById(client);
		const customer1 = await User.findById(customer);
		const newChat = new Chat({
			parking: parking1._id,
			client: client1._id,
			customer: customer1._id,
			messages: 0
		});
		await newChat.save().catch(Error);
		res.status(200).json({ auth: true });
	}
	catch(err) {
		return res.status(400).json({ message: 'Could not create chat', err });
	}
};

const getall = async (req: Request, res: Response) => {
	const chats = await Chat.find();
	res.json(chats);
}

const getone = async (req: Request, res: Response) => {
	const chat1 = await Chat.findById(req.params.id);
	// FER TRY CATCH
	res.json(chat1);
};

export default {
	create,
	getone,
	getall
};