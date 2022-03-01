import Booking from '../models/Booking';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/erorHandler';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// @method          POST
// @path            /api/bookings
// @description     Create new booking

const newBooking = catchAsyncErrors(async (req, res) => {
	const {
		room,
		checkInDate,
		checkOutDate,
		daysOfStay,
		paymentInfo,
		amountPaid,
	} = req.body;
	const user = req.user._id;
	const booking = await Booking.create({
		room,
		user,
		checkInDate,
		checkOutDate,
		daysOfStay,
		paymentInfo,
		amountPaid,
		paidAt: Date.now(),
	});
	res.status(200).json({
		success: true,
		booking,
	});
});

// @method          GET
// @path            /api/bookings/check
// @description     Check the availability of room

const checkRoomBookingsAvailability = catchAsyncErrors(async (req, res) => {
	let { roomId, checkInDate, checkOutDate } = req.query;

	const bookings = await Booking.find({
		room: roomId,
		$and: [
			{ checkInDate: { $lte: checkOutDate } },
			{ checkOutDate: { $gte: checkInDate } },
		],
	});
	let isAvailability;
	if (bookings && bookings.length === 0) {
		isAvailability = true;
	} else {
		isAvailability = false;
	}

	res.status(200).json({
		success: true,
		isAvailability,
	});
});

// @method          GET
// @path            /api/bookings/check_booked_dates
// @description     Get all booked dates of room

const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
	const { roomId } = req.query;
	const bookings = await Booking.find({ room: roomId });

	let bookedDates = [];
	bookings.forEach((booking) => {
		const timeDifference = moment().utcOffset() / 60;
		console.log('timeDifference ==>', timeDifference);
		const checkInDate = moment(booking.checkInDate).add(
			timeDifference,
			'hours'
		);
		const checkOutDate = moment(booking.checkOutDate).add(
			timeDifference,
			'hours'
		);
		const range = moment.range(moment(checkInDate), moment(checkOutDate));
		const dates = Array.from(range.by('day'));
		bookedDates = bookedDates.concat(dates);
	});

	res.status(200).json({ success: true, bookedDates });
});

export { newBooking, checkRoomBookingsAvailability, checkBookedDatesOfRoom };
