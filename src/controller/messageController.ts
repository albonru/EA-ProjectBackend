import Parking from '../model/Parking';
import User from '../model/User';
import Chat from '../model/Chat';
import Message from '../model/Message';
import { Request, Response } from 'express';

const message = async (req: Request, res: Response) => {
	const { chat, user, date, text } = req.body;
	const chat1 = await Chat.findById(chat);
	const user1 = await User.findOne({ name: user });

	const newChat = new Chat({
		chat: chat1._id,
        client: user1._id,
		Send: date,
		text,
	});
	await newChat.save();
	res.status(200).json({ auth: true });
};

const cancel = async (req: Request, res: Response) => {
	const message1 = await Message.findById(req.body.id);
	if (!message1) {
		return res.status(400).json({ message: 'Booking not found' });
	}
	// try {

	// }
	// catch(e) {
	// 	console.log(e);
	// 	return res.status(400).send('Booking does not exist');
	// }
	await Message.deleteOne({ _id: req.body.id });
	res.status(200).json({ auth: true });
};

export default {
	message,
	cancel,
};