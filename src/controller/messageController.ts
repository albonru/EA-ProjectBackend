import User from '../model/User';
import Chat from '../model/Chat';
import Message from '../model/Message';
import { Request, Response } from 'express';

const message = async (req: Request, res: Response) => {
	const { chat, user, text1 } = req.body;
	const chat1 = await Chat.findById(chat);
	const user1 = await User.findById(user);
	const date = new Date();
	const newMessage = new Message({
		chat: chat1._id,
        client: user1._id,
		send: date,
		text: text1
	});
	await newMessage.save().catch(Error);
	res.status(200).json({ auth: true });
};

const getallmessagesofChat = async (req: Request, res: Response) => {
	const { chat1 } = req.body;
	const messages = await Message.find({chat: chat1});
	res.json(messages);
};

const getall = async (req: Request, res: Response) => {
	const messages1 = await Message.find();
	res.json(messages1);
}

const deletemessage = async (req: Request, res: Response) => {
	const message1 = await Message.findById(req.params.id);
	if (!message1) {
		return res.status(400).json({ message: 'Message not found.' });
	}
	// try {

	// }
	// catch(e) {
	// 	console.log(e);
	// 	return res.status(400).send('Booking does not exist');
	// }
	await Message.deleteOne({ _id: req.params.id });
	res.status(200).json({ auth: true });
};

export default {
	message,
	getallmessagesofChat,
	getall,
	deletemessage
};