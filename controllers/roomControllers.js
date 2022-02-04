import Room from '../models/Room';
import ErrorHandler from '../utils/erorHandler';

// @method          GET
// @path            /api/rooms
// @description     Create new room
const allRooms = async (req, res) => {
	try {
		const rooms = await Room.find({});
		res.status(200).json({ success: true, count: rooms.length, rooms });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @method          POST
// @path            /api/rooms
// @description     Create new room
const newRoom = async (req, res) => {
	try {
		const room = await Room.create(req.body);
		res.status(200).json({ success: true, room });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @method          GET
// @path            /api/rooms/:id
// @description     Get room by Id
const getSingleRoom = async (req, res) => {
	try {
		const { id } = req.query;
		const room = await Room.findById(id);
		if (!room)
			return res
				.status(400)
				.json({ status: false, error: 'Room not found with this id' });
		res.status(200).json({ success: true, room });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

export { allRooms, newRoom, getSingleRoom };
