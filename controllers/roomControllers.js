import Room from '../models/Room';
import ErrorHandler from '../utils/erorHandler';

const allRooms = (req, res) => {
	return res.status(200).json({ success: true, data: 'all rooms' });
};

// @method          GET
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
export { allRooms, newRoom };
