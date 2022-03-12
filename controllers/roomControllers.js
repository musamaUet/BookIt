import Room from '../models/Room';
import Booking from '../models/Booking';
import ErrorHandler from '../utils/erorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';

// @method          GET
// @path            /api/rooms
// @description     Create new room
const allRooms = catchAsyncErrors(async (req, res) => {
	const resPerPage = 4;

	const roomsCount = await Room.countDocuments();

	const apiFeatures = new APIFeatures(Room.find(), req.query)
		.search()
		.filter()
		.pagination(resPerPage);

	let rooms = await apiFeatures.query;
	let filteredRoomsCount = rooms.length;

	res
		.status(200)
		.json({ success: true, roomsCount, resPerPage, filteredRoomsCount, rooms });
});

// @method          POST
// @path            /api/rooms
// @description     Create new room
const newRoom = catchAsyncErrors(async (req, res) => {
	const room = await Room.create(req.body);
	res.status(200).json({ success: true, room });
});

// @method          GET
// @path            /api/rooms/:id
// @description     Get room by Id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.query;
	const room = await Room.findById(id);
	if (!room) return next(new ErrorHandler('Room not found with this id', 404));
	res.status(200).json({ success: true, room });
});

// @method          PUT
// @path            /api/rooms/:id
// @description     Update room by Id
const updateRoom = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.query;
	let room = await Room.findById(id);
	if (!room) return next(new ErrorHandler('Room not found with this id', 404));

	room = await Room.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({ success: true, room });
});

// @method          DELETE
// @path            /api/rooms/:id
// @description     Delete room by Id
const deleteRoom = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.query;
	let room = await Room.findById(id);
	if (!room) return next(new ErrorHandler('Room not found with this id', 404));

	room = await Room.findByIdAndRemove(id);
	res.status(200).json({ success: true, room });
});

// @method          PUT
// @path            /api/reviews
// @description     Create room reivew

const createRoomReview = catchAsyncErrors(async (req, res) => {
	const { rating, comment, roomId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const room = await Room.findById({ _id: roomId });

	const isReviewed = room.reviews.find(
		(rev) => rev.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		room.reviews.forEach((review) => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		});
	} else {
		room.reviews.push(review);
		room.numOfReviews = room.reviews.length;
	}

	room.ratings = room.reviews.reduce(
		(acc, item) => (item.rating + acc, 0) / room.reviews.length
	);

	await room.save({ validateBeforeSave: false });

	res.status(200).json({ success: true });
});

// @method          GET
// @path            /api/reviews/check_review_availability
// @description     Check Review Availability

const checkReviewAvailability = catchAsyncErrors(async (req, res) => {
	const { roomId } = req.query;

	const bookings = await Booking.find({ user: req.user._id, room: roomId });

	let isReviewAvailable = false;

	if (bookings && bookings.length > 0) isReviewAvailable = true;

	res.status(200).json({ success: true, isReviewAvailable });
});
export {
	allRooms,
	newRoom,
	getSingleRoom,
	updateRoom,
	deleteRoom,
	createRoomReview,
	checkReviewAvailability,
};
