import Booking from '../model/Booking';
import User from '../model/User';
import Parking from '../model/Parking';
import { Request, Response } from 'express';

const book = async (req: Request, res: Response) => {
	const { parking, arrival, departure } = req.body;
	try {
		const parking1 = await Parking.findById(parking);
		// FALTA MULTIPLICAR PELS DIES
		const cost: number = parking1.price;
		const newBooking = new Booking({
			parking: parking1._id,
			customer: req.params.user_id,
			arrival,
			departure,
			owner: parking1.user,
			cost
		});
		await newBooking.save();
		await User.updateOne(
			{ _id: req.params.user_id },
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
		const booking2 = await Booking.findById(req.body._id);
	}
	catch(err) {
		return res.status(400).send({ message: 'Booking does not exist', err });
	}
	try {
		const booking1 = await Booking.findById(req.body._id);
		// if ((booking1.customer._id !== req.params.user_id) && (booking1.owner._id !== req.params.user_id)) {
		// 	return res.status(403).send({ message: 'Unauthorised!!!'} );
		// }
		await User.updateOne(
			{ _id: booking1.customer },
			{ $pull: { myBookings: booking1._id } }
		);
		await Booking.deleteOne({ _id: req.body._id });
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
		const booking = await Booking.findById(req.params.id).populate('parking');
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