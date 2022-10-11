import Booking from '../model/Booking';
import User from '../model/User';
import Parking from '../model/Parking';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const book = async (req: Request, res: Response) => {
	const { user, parking, arrival, departure } = req.body;
	// validation for data type
	// body('arrival').isDate(),
	// body('departure').isDate(),
	// (request: Request, response: Response) => {
	// 	const errors = validationResult(request);
	// 	if (!errors.isEmpty()) {
	// 		console.log('Format validation error');
	// 		return res.status(400).json({ errors: errors.array() });
	// 	}
	// }
	// validation for user and parking existing
	const customer = await User.findOne({ name: user });
	const parking1 = await Parking.findById(parking);
	if (!customer) {
		return res.status(400).json({ message: 'User not found' });
	}
	if (!parking1) {
		return res.status(400).json({ message: 'Parking not found' });
	}
	// try {
		
	// }
	// catch(e) {
	// 	console.log(e);
	// 	return res.status(400).json({ message: 'Customer not found' });
	// }
	// try {
		
	// }
	// catch(e) {
	// 	console.log(e);
	// 	return res.status(400).json({ message: 'Parking not found' });
	// }
	// booking creation
	const newBooking = new Booking({
		parking: parking1._id,
		customer: customer._id,
		arrival: arrival,
		departure: departure,
	});
	// AFEGIR EN EL ARRAY DEL USUARI??????
	await newBooking.save();
	res.status(200).json({ auth: true });
};

const cancel = async (req: Request, res: Response) => {
	const booking1 = await Booking.findById(req.body.id);
	if (!booking1) {
		return res.status(400).json({ message: 'Booking not found' });
	}
	// try {
		
	// }
	// catch(e) {
	// 	console.log(e);
	// 	return res.status(400).send('Booking does not exist');
	// }
	await Booking.deleteOne({ _id: req.body.id });
	res.status(200).json({ auth: true });
};

const getall = async (req: Request, res: Response) => {
	const bookings = await Booking.find().populate('customer');
	res.json(bookings);
};

const getone = async (req: Request, res: Response) => {
	const booking = await Booking.findById(req.params.id);
	// try {
		
	// }
	// catch(e) {
	// 	console.log(e);
	// 	return res.status(400).send('Booking not found');
	// }
	res.json(booking);
};

export default {
	book,
	cancel,
	getall,
	getone
};