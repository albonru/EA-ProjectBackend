import Booking from '../model/Booking';
import User from '../model/User';
import Parking from '../model/Parking';
import { Request, Response } from 'express';

const book = async (req: Request, res: Response) => {
	const { user, parking, arrival, departure } = req.body;
	try {
		const customer = await User.findOne({ email: user });
		const parking1 = await Parking.findById(parking);
		const newBooking = new Booking({
			parking: parking1._id,
			customer: customer._id,
			arrival,
			departure,
		});
		await newBooking.save();
		await User.updateOne(
			{ email: user },
			{ $addToSet: { myBookings: newBooking._id } }
		);
		res.status(200).json({ auth: true });
	}
	catch(err) {
		return res.status(400).json({ message: 'Could not create booking', err });
	}
};

const cancel = async (req: Request, res: Response) => {
	try {
		const booking1 = await Booking.findById(req.params.id);
	}
	catch(err) {
		return res.status(400).send({ message: 'Booking does not exist', err });
	}
	try {
		const booking1 = await Booking.findById(req.params.id);
		await User.updateOne(
			{ _id: booking1.customer },
			{ $pull: { myBookings: booking1._id } }
		);
		await Booking.deleteOne({ _id: req.params.id });
		res.status(200).json({ auth: true });
	}
	catch(err) {
		return res.status(500).send({ message: 'Could not delete booking', err});
	}
};

const getall = async (req: Request, res: Response) => {
	try {
		const bookings = await Booking.find(); // .populate('customer').populate('parking');
		res.json(bookings);
	}
	catch(err) {
		return res.status(400).send({ message: 'Could not find bookings', err});
	}
};

const getone = async (req: Request, res: Response) => {
	try {
		const booking = await Booking.findById(req.params.id); // .populate('customer').populate('parking');
		res.json(booking);
	}
	catch(err) {
	 	return res.status(400).send({ message: 'Booking not found', err });
	}
};

export default {
	book,
	cancel,
	getall,
	getone
};