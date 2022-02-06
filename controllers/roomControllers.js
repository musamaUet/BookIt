import Room from '../models/Room';
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

	// apiFeatures.pagination(resPerPage);
	// rooms = await apiFeatures.query;
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

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
