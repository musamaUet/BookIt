import Booking from '../models/Booking';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/erorHandler';

// @method          POST
// @path            /api/bookings
// @description     Create new booking

const newBooking = catchAsyncErrors(async (req, res, next) => {
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

export { newBooking };
