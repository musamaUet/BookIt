import Room from '../models/Room';
import dbConnect from '../config/dbConnect';
import RoomsData from '../seeders/roomsData.json';

dbConnect();
const seedRooms = async () => {
	try {
		await Room.deleteMany();
		await Room.insertMany(RoomsData);
		process.exit();
	} catch (error) {
		console.log('room seeder error', error.message);
	}
};

seedRooms();
